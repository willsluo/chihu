import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserService } from '../../service/user.service';

@IonicPage()
@Component({
  selector: 'page-fork-discover',
  templateUrl: 'fork-discover.html',
})
export class ForkDiscover {

  rootNavCtrl: NavController;
  //数据
  data: any = [];

  constructor(
    public http: Http,
    public navCtrl: NavController,
    public navParams: NavParams,
    public UserService: UserService
  ) {
    this.rootNavCtrl = navParams.get('rootNavCtrl');
    if (this.UserService._user._id) {
      this.getforkdata();
    } else {
      this.gethotdata();
    }
  }

  //获取关注的分享
  getforkdata() {
    
    let url = "http://www.devonhello.com/chihu/getmyforkshare";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.UserService._user._id, {
      headers: headers
    })
      .subscribe((res) => {
        if (res.json() != '0') {
          this.data = res.json();
        } else {
          //没有任何分享的数据时，获取热门分享
          this.gethotdata();
        }

      });
  }

  //获取热门分享
  gethotdata() {

    let url = "http://www.devonhello.com/chihu/hot_share";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "", {
      headers: headers
    })
      .subscribe((res) => {
        this.data = res.json();

      });
  }

  //查看分享
  pushOpenSharePage(_id) {

    this.rootNavCtrl.push('OpenShare', {
      _id: _id
    });
  }

  ionViewWillLeave() {
    this.UserService.presentLoadingDismiss();
  }

}
