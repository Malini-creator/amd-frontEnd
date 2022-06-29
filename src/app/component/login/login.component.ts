import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //local variable decalaration
  public submitted: boolean = false;
  public showChart: boolean = false;
  public loginDisable: boolean = false;
  public inputValid: boolean = false;
  public cityerror: any = '';
  public numbererror: any = '';
  public form: FormGroup;
  public count: number = 8;

  constructor(private formBuilder: FormBuilder, public apiService: ApiService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group(
      {
        city: ['', Validators.required],
        number: ['', Validators.required]
      }
    );
  }
  get f() {
    return this.form.controls;
  }

  /* Submission Handler function */

  onSubmit(): void {

    if (this.form.invalid) {
      if (this.form.value.city == '') {
        this.cityerror = 'Please add a valid city name'
      } else {
        this.cityerror = ''
      }
      if (this.form.value.number == '') {
        this.numbererror = 'Please add a valid phone number'
      } else {
        this.numbererror = ''
      }
    } else {
      if (this.form.valid) {
        this.loginDisable = true;
        this.numbererror = "";
        this.cityerror = "";
        const formData = {
          city: this.form.value.city,
          mobile: this.form.value.number,
        };

        /* First time API calling */
        this.apiService.login(formData).subscribe((value) => {
          if (value.statusCode === 200) {
            if (JSON.parse(value.data.Sms_Action).statusCode === 500) {
              value.data.Sms_Action = []
            }
            this.apiService.chartData.next(value.data)
            this.submitted = false
            this.showChart = true;
            this.loginDisable = true;

            /* Second time API calling after one minute*/
            setTimeout(() => {
              this.getChartResponse(formData);
            }, 60000)
          }
        }, (err) => {
          console.log(err)
          this.numbererror = 'Please add a valid phone number'
          this.submitted = true
        }
        );
      }
    }
  }

  /* Function calling after every one minute upto 10 times*/
  getChartResponse(formData) {
    this.apiService.login(formData).subscribe((value) => {
      if (value.statusCode === 200) {
        if (JSON.parse(value.data.Sms_Action).statusCode === 500) {
          value.data.Sms_Action = []
        }
        this.apiService.chartData.next(value.data)
        this.showChart = true;
        this.loginDisable = true;
      }
      if (this.count > 0) {
        this.count = this.count - 1;
        setTimeout(() => {
          this.getChartResponse(formData);
        }, 60000)
      }
    }, (err) => {
      console.log(err)
      this.numbererror = 'Please add a valid phone number'
      this.submitted = true
    }
    );
  }

  /* Clearing feilds based on error  */
  clearField(feild: string = '') {
    
    if (feild === "city") {
      this.cityerror = "";
      this.form.controls['city'].setValue("");
    } else if (feild === "number") {
      this.form.controls['number'].setValue("");
      this.submitted = false;
      this.numbererror = ''
    }
  }
}