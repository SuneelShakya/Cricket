import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent, Fetchdialog, Fetcheditdialog, Fetchdeletedialog } from './fetch-data/fetch-data.component';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericService } from './services/Generic.service';
import { ComponentDataComponent, Componentdialog, Componentdeletedialog, Componenteditdialog } from './Component/Component-data.component';
import { Flowdialog, Floweditdialog, FlowDataComponent, Flowdeletedialog } from './Flow/Flow-data.component';
import { WorkflowComponent } from './workflow/workflow.component';
import { SearchFilterPipe, NullValues, ReplaceCommaPipe, SizePipe, BitratePipe, SplitCommaPipe } from './app.shared.pipe';
import { TagInputModule } from 'ngx-chips';
import { ProfileComponent, DialogProfileCreate } from './profile/profile.component';
import { GroupComponent } from './group/group.component';
import { TransactionDataComponent, Transactiondeletedialog, Transactiondialog, Transactioneditdialog } from './Transaction/Transaction-data.component';
import { UserComponent } from './user/user.component';
import { MediaService } from './services/media.service';
import { EventDataComponent, Eventeditdialog, Eventdeletedialog, Eventdialog } from './Events/Event-data.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faClone, faTrash, faSync, faBan, faPlus, faMinus, faEllipsisH, faUser, faCheck, faCross, faTimes, faUserCog, faSearch, faSignOutAlt, faClock, faBars } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { TeamPlayerComponent } from './TeamPlayer/Teamplayer.componet';
import { StructureofTeamPlayerComponent } from './StructureofTeamPlayer/StructureofTeamPlayer.component';



//import { TransactionDataComponent } from './Transaction/Transaction-data.component';
//mport { TransactionDataComponent, Transactiondialog, Transactioneditdialog, Transactiondeletedialog } from './Transaction/Transaction-data.component';
library.add(faCoffee,faEdit,faClone,faTrash,faSync,faBan,faPlus,faMinus,faEllipsisH,faUser,faCheck,faTimes,faUserCog,faSearch,faSignOutAlt,faClock,faBars);

@NgModule({
  declarations: [
    UserComponent,
    GroupComponent,
    ProfileComponent,
    DialogProfileCreate,
    AppComponent,
    NavMenuComponent,
    WorkflowComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TeamPlayerComponent,
    StructureofTeamPlayerComponent,
    Fetchdialog,
    Fetcheditdialog,
    ComponentDataComponent,
    Componentdialog,
    FlowDataComponent,
    Flowdialog,
    Floweditdialog,
    SearchFilterPipe,
    NullValues,
    ReplaceCommaPipe,
    Fetchdeletedialog,
    Componentdeletedialog,
    Flowdeletedialog,
    Componenteditdialog,
    TransactionDataComponent,
    Transactiondeletedialog,
    Transactiondialog,
    Transactioneditdialog,
    SizePipe,
    BitratePipe,
    SplitCommaPipe,
    Eventdialog,
    Eventeditdialog,
    Eventdeletedialog,
    EventDataComponent
  
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    BrowserAnimationsModule,
    TagInputModule,
    FontAwesomeModule,
    
    RouterModule.forRoot([
      { path: '', component: CounterComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'TeamPlayer', component: TeamPlayerComponent },
      { path: 'StructureofTeamPlayer', component: StructureofTeamPlayerComponent },
      { path: 'Component-data', component: ComponentDataComponent },
      { path: 'Flow-data', component: WorkflowComponent },
      { path: 'profile-data', component: ProfileComponent },
      { path: 'group-data', component: GroupComponent },
      { path: 'User-data', component: UserComponent },
      { path: 'Transaction-data', component: TransactionDataComponent },
      { path: 'Event-data', component: EventDataComponent },


    ])
  ],
  entryComponents: [DialogProfileCreate, Fetchdialog, Fetcheditdialog, Componenteditdialog, Componentdialog, Flowdialog, Floweditdialog, Fetchdeletedialog, Componentdeletedialog, Flowdeletedialog,Eventeditdialog,Eventdeletedialog,Eventdialog],
    
    
    providers: [GenericService, FetchDataComponent,TeamPlayerComponent,StructureofTeamPlayerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
