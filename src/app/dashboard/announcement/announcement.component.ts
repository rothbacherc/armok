import { Component, OnInit, ViewChild, ElementRef, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Save } from 'src/app/models/save.model';
import { File } from 'src/app/models/file.model';
import { LoginService } from 'src/app/services/login.service';
import { UploadSaveService } from 'src/app/services/upload-save.service';
import { TrendSavesService } from 'src/app/services/trend-saves.service';
import { SelectSaveService } from 'src/app/services/select-save.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit, DoCheck {
  @ViewChild('fileInput') fileInput: ElementRef
  uploadSave: Save
  uploadFile: File
  newSave: FormGroup
  loggedIn: boolean
  selectedSave: Save
  selectedSaveType: string
  selectedSaveShare: string
  selectedSaveBlood: string
  newSaveType: saveTypes
  newSaveShare: boolean
  openTab: string = 'announce'
  listVisibility: string[] = ['Public', 'Private']
  listTypes: string[] = ['Seed', 'World', 'Fort', 'Character']

  constructor(private loginService: LoginService, private addSave: UploadSaveService, 
    private trendServ: TrendSavesService, private selectServ: SelectSaveService) { }

  ngOnInit() {
    this.newSave = new FormGroup({
      'saveName': new FormControl(''),
      'description': new FormControl(''),
      'type': new FormControl(''),
      'vis': new FormControl(''),
      'blood': new FormControl(false),
      'save': new FormControl(null),
    })
    this.getSelect()
  }

  ngDoCheck(){
    this.loggedIn = this.loginService.isLoggedIn()
  }

  chooseTab(tab: string){
    this.openTab = tab
  }

  getSelect(){
    if(!this.selectedSave){
      this.selectServ.setSelected(this.trendServ.getTopSave())
    }
    this.selectedSave = this.selectServ.getSelected()
    this.selectedSaveType = this.selectServ.getType()
    this.selectedSaveShare = this.selectServ.getShare()
    this.selectedSaveBlood = this.selectServ.getBlood()
  }

  //reactive form might not have functionality for file upload,
  //we might have to switch to template form for that
  onSubmit(){
    //parse type into enum
    switch(this.newSave.controls.type.value){
      case 'Seed': {
        this.newSaveType = saveTypes.seed
        break
      }
      case 'World': {
        this.newSaveType = saveTypes.world
        break
      }
      case 'Fort': {
        this.newSaveType = saveTypes.fort
        break
      }
      case 'Character': {
        this.newSaveType = saveTypes.character
        break
      }
    }
    this.newSaveShare = this.newSave.controls.vis.value === 'Private' ? true : false
    if(this.loggedIn){
      this.uploadSave = new Save(this.newSave.controls.saveName.value, 
        this.newSaveType, this.newSave.controls.description.value,
        this.newSaveShare, this.newSave.controls.blood.value,
        this.loginService.getCurrentUsername())
    }
    else{
      this.uploadSave = new Save(this.newSave.controls.saveName.value, 
        this.newSaveType, this.newSave.controls.description.value,
        this.newSaveShare, this.newSave.controls.blood.value,
        'Anonymous')
    }
    this.uploadFile = new File(this.newSave.controls.saveName.value, 
      this.newSave.controls.save.value)
    this.selectServ.setSelected(this.uploadSave)
    this.getSelect()
    this.openTab = 'selected'
    this.addSave.addNewSave(this.uploadSave)
    this.newSave.reset()
  }

}
