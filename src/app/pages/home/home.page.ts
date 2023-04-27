import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public mainForm !: FormGroup;
  public Data: any[] = [];

  constructor(
    private dbSrv: DbService,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dbSrv.dbState()
      .subscribe(res => {
        if (res)
          this.dbSrv.fetchSongs()
            .subscribe(songs => this.Data = [...songs]);
      });

    this.mainForm = this.formBuilder.group({
      artist: [''],
      song: ['']
    });
  }

  storeData() {
    this.dbSrv.addSong(
      this.mainForm.value.artist,
      this.mainForm.value.song
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  deleteSong(id: number) {
    this.dbSrv.deleteSong(id)
      .then(async res => {
        let toast = await this.toastCtrl.create({
          message: 'Song deleted',
          duration: 2500
        });
        toast.present();
      })
  }

}
