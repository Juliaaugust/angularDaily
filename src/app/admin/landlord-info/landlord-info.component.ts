import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { User } from '../../common/models/user.model';
import { UsersService } from '../../common/services/users.service';
import { Vacancy } from '../../common/models/vacancy.model';

@Component({
  selector: 'app-landlord-info',
  templateUrl: './landlord-info.component.html',
  styleUrls: ['./landlord-info.component.sass']
})
export class LandlordInfoComponent implements OnInit {

  landlordName: string;
  landlordRole: string;
  landlordRegistrDate: string;
  landlordTel: string;
  landlordEmail: string;
  landlordId: number;
  emailstring: string;
  telstring: string;
  llVacansies: Vacancy[];

  constructor(private route: ActivatedRoute, private userService: UsersService) { }

  ngOnInit() {
    this.landlordId = this.route.snapshot.params.id;

    this.userService.getUserById(this.landlordId)
      .subscribe(landlord => {
        this.landlordName = landlord.name;
        this.landlordRole = landlord.role;
        this.landlordRegistrDate = landlord.registrDate;
        this.landlordTel = landlord.tel;
        this.landlordEmail = landlord.email;
        this.emailstring = `mailto:${landlord.email}`;
        this.telstring = `tel:${landlord.tel}`;
        this.llVacansies = landlord.vacancies;
      });
  }

}
