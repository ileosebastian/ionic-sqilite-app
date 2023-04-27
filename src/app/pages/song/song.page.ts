import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.page.html',
  styleUrls: ['./song.page.scss'],
})
export class SongPage implements OnInit {
  public editForm!: FormGroup;
  public id: string | null;

  constructor(
    private db: DbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    let id: number = this.id ? +this.id : 0;
    this.db.getSong(id)
      .then(res => {
        this.editForm.setValue({
          artist_name: res['artist_name'],
          song_name: res['song_name']
        })
      })
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      artist_name: [''],
      song_name: ['']
    })
  }

  saveForm() {
    let id: number = this.id ? +this.id : 0;
    this.db.updateSong(id, this.editForm.value)
      .then(res => {
        console.log(res);
        this.router.navigate(['/home']);
      })
  }

}