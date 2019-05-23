import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private userService: UserService) { }
  projects: Project[];
  filteredProjects: Project[];
  private _keyword = '';
  private _minPrice = '';
  private _maxPrice= '';
  private _tag = 'All';

  ngOnInit() {
    this.projectService.getActiveProjects().subscribe(data => {
      this.projects = data;
      this.filteredProjects = data;
    });
  }

  filterProjects() {
    this.filteredProjects = this.projects.filter(project => {
      // tslint:disable-next-line:max-line-length
      return this.filterKeyword(project.title) || this.filterKeyword(project.description);
    });

    this.filteredProjects = this.filteredProjects.filter(project => {
      // tslint:disable-next-line:max-line-length
      return this.filterMinPrice(project.min_price);
    });

    this.filteredProjects = this.filteredProjects.filter(project => {
      // tslint:disable-next-line:max-line-length
      return this.filterTag(project.t_id);
    })

    console.log(this._keyword, this._minPrice, this._maxPrice, this._tag);
  }

  get keyword(){
    return this._keyword;
  }

  set keyword(value) {
    this._keyword = value;
    this.filterProjects();
  }

  filterKeyword(value) {
    if (value.indexOf(this._keyword) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  get minPrice() {
    return this._minPrice;
  }

  set minPrice(value) {
    this._minPrice = value;
    this.filterProjects();
  }

  filterMinPrice(value) {
    if (value > this._minPrice) {
      return true;
    } else {
      return false;
    }
  }

  get maxPrice() {
    return this._maxPrice;
  }

  set maxPrice(value) {
    this._maxPrice = value;
    this.filterProjects();
  }

  filterMaxPrice(value) {
    if (value < this._maxPrice) {
      return true;
    } else {
      return false;
    }
  }

  get tag() {
    return this._tag;
  }

  set tag(value) {
    this._tag = value;
    this.filterProjects();
  }

  filterTag(value) {
    if (this._tag === value || this._tag === 'All') {
      return true;
    } else {
      return false;
    }
  }
}
