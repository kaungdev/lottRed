import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import "rxjs/Rx";
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { ModalController, AlertController } from 'ionic-angular';

import { Lottery } from '../../models/lottery';
import { LotteryNumber } from '../../models/lotteryNumber';
import { Jackpot } from '../../models/jackpot';
import { JackpotPage } from '../jackpot/jackpot';
import api from '../../data/url';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  lottery: Lottery;
  searchForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    private loadingController: LoadingController
  ) {
    
  }

  ngOnInit() {
    this.onGetLottery();
    this.onPrepareSearchForm();
  }

  onPrepareSearchForm() {
    this.searchForm = new FormGroup({
      'lotteryWord': new FormControl(null, Validators.required),
      'lotteryDigit': new FormControl(null, Validators.required)
    });
  }

  onSearch() {
    const lotteryWord = this.searchForm.get('lotteryWord').value;
    const lotteryDigit = this.searchForm.get('lotteryDigit').value;
    const searchLotteryNumber = new LotteryNumber(lotteryWord, lotteryDigit);
    let jackpots: Jackpot[] = [];
    let match = false;
    for (let prize of this.lottery.prizes) {
      for (let lotteryNumber of prize.lotteryNumbers) {
        let charCount = lotteryNumber.lotteryDigit.length;

        if (searchLotteryNumber.lotteryWord === lotteryNumber.lotteryWord && searchLotteryNumber.lotteryDigit.slice(0, charCount + 1) === lotteryNumber.lotteryDigit) {
          const jackpot = new Jackpot(prize.prizeDescription, lotteryNumber);
          jackpots.push(jackpot);
          match = true;
          console.log(lotteryNumber);          
        } else {
        }
      }
    }
    if (match) {   
      const modal = this.modalCtrl.create(JackpotPage, {jackpots: jackpots});
      modal.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'စိတ်မကောင်းပါ။',
        subTitle: 'ထီနံပါတ်မှာ ထီပေါက်စဥ်တွင် ကိုက်ညီမှုမရှိပါ။',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  onGetLottery() {
    const loading = this.loadingController.create({
      content: 'Please wait...'
    });
    loading.present();
    this.http
      .get(api.lotteryAPI)
      .map((response: Response) => {
        const lottery: Lottery = response.json() ? response.json() : null;
        return lottery;
      }).
      do((lottery: Lottery) => {
      })
      .subscribe(
        (lottery: Lottery) => {
          loading.dismiss();
          if (lottery) {
            this.lottery = lottery;
            console.log(this.lottery);            
          } else {
            this.lottery = null;
          }
        },
        error => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'No Internet',
            subTitle: 'Inernet ချိတ်ဆက်၍မရပါ။',
            buttons: [
              {
                text: 'Retry',
                handler: () => {
                  this.onGetLottery();
                }
              }
            ]
          });
          alert.present();     
        }
      );
  }

}
