import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {Http} from "@angular/http";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  member_status: string = "ys_member";
  member_no : string = null;
  nama : string;
  profesi : string;
  pendidikan : string;
  kelamin : string;
  alamat : string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,public http :Http) {

  }

    loginAlert() {
    let alert = this.alertCtrl.create({
      title: 'Menunggu Scan Kartu',
      inputs: [
        {
          name: 'Barcode_Number',
          placeholder: 'Barcode Number'
        }],
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Login',
                handler: data => {
                    this.http.get("http://localhost/crud-api/api.php/members?filter=MemberNo,eq,".concat(data.Barcode_Number).concat("&transform=1"))
                        .map(res=>res.json())
                        .subscribe(
                            data=>{
                                console.log(data.members.length)
                                if(data.members.length != 0 && data.members.length == 1){
                                    this.nama = data.members[0].Fullname;
                                    this.profesi = data.members[0].Job_id;
                                    this.pendidikan = data.members[0].EducationLevel_id;
                                    this.kelamin = data.members[0].Sex_id;
                                    this.alamat = data.members[0].Address;
                                    this.member_no = data.members[0].MemberNo;
                                }
                                else{
                                    const alert = this.alertCtrl.create({
                                        title: 'Member tidak ditemukan',
                                        subTitle: 'Tidak ada data member di database',
                                        buttons: ['Dismiss']
                                    });
                                    alert.present();
                                }
                            }
                        )
                }
            }
        ]
    });
    alert.present();
  }

    tamuguest(_nama,_profesi,_pendidikan,_kelamin,_alamat,_ruang,_tujuan){
      var d = new Date();
      var date = d.getDate();
      var month = d.getMonth()+1;
      var year = d.getFullYear();

      var jsondata = {"NoAnggota":this.member_no,"CreateDate":year+"-"+month+"-"+date,"Nama":_nama,"Profesi_id":_profesi,"PendidikanTerakhir_id":_pendidikan,"JenisKelamin_id":_kelamin,"Alamat":_alamat, "Location_Id":_ruang,"TujuanKunjungan_Id":_tujuan};
      this.http.post("http://localhost/crud-api/api.php/memberguesses",JSON.stringify(jsondata))
          .map(res=>res)
          .subscribe(
              data=>{
                  const alert = this.alertCtrl.create({
                      title: 'Success',
                      subTitle: "Selamat datang ".concat(_nama),
                      buttons: ['Dismiss']
                  });
                  alert.present();
                  this.member_no = null;
              },
              err=>{
                  const alert = this.alertCtrl.create({
                      title: 'Failed',
                      subTitle: 'Error',
                      buttons: ['Dismiss']
                  });
                  alert.present();
              }
          )
    }

}
