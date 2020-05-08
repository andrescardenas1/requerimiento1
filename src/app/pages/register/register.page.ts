import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  your_name: string = "";
  email: string = "";
  password: string = "";
  confirm_pass: string = "";
  disabledButton;

  constructor(
    private router: Router,
    private toasCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }
  async tryRegister() {
    if (this.your_name == "") {
      this.presentToast('your name is requeride');
    } else if (this.email == " ") {
      this.presentToast('email is requeride');
    } else if (this.password == " ") {
      this.presentToast('password is requeride');
    } else if (this.confirm_pass != this.password) {
      this.presentToast('confirmed pass is requeride');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'please wait ...',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_register',
          your_name: this.your_name,
          email: this.email,
          password: this.password,
          confirm_pass: this.confirm_pass,
        }

        this.accsPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
          if (res.success==true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/login']);

          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);

          } 
         },(err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Timeout');
        });

      });
    }
  }
  async presentToast(a) {
    const toast = await this.toasCtrl.create({
      message: '',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

}
