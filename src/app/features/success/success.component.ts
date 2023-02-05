import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rdx-success',
  standalone: true,
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
  public barberGifUrl = '';

  public constructor(private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    const { data: barberGifs } = this.route.snapshot.data['barberGifs'];
    const randomIndex = Math.floor(Math.random() * barberGifs.length);

    this.barberGifUrl = barberGifs[randomIndex].images.original.webp;
  }
}
