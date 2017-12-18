import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Jackpot } from '../../models/jackpot';
import { ViewController } from 'ionic-angular/navigation/view-controller';

/**
 * Generated class for the JackpotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jackpot',
  templateUrl: 'jackpot.html',
})
export class JackpotPage {
  jackpots: Jackpot[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.jackpots = this.navParams.get('jackpots');
    console.log(this.jackpots);    
  }

  onClose() {
    this.viewCtrl.dismiss();
  };

}
