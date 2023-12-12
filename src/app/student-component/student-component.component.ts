import { Component } from '@angular/core';

type College = {
  colID: number;
  colShortName: string;
  colFullName: string;
}

type Program = {
  progID: number;
  progShortName: string;
  progFullName: string;
  progCollege: number;
}

type Student = {
  studID: number;
  studFirstName: string;
  studLastName: string;
  studMidName?: string;
  studProgram: Program;
  studCollege: College;
  studYear: number;
}

@Component({
  selector: 'app-student-component',
  templateUrl: './student-component.component.html',
  styleUrls: ['./student-component.component.css']
})

export class StudentsComponent{
  colleges: Array<College> = [
    { colID: 100, colShortName: 'SCS', colFullName: 'School of Computer Studies' },
    { colID: 101, colShortName: 'SBM', colFullName: 'School of Business and Management' },
    { colID: 102, colShortName: 'SAS', colFullName: 'School of Arts and Sciences' },
    { colID: 103, colShortName: 'SOENG', colFullName: 'School of Engineering' },
    { colID: 104, colShortName: 'SED', colFullName: 'School of Education' },
    { colID: 105, colShortName: 'SAMS', colFullName: 'School of Allied Medical Sciences' }
   ];

  programs: Array<Program> = [
    { progID: 100001, progShortName: 'BSCS', progFullName: 'Bachelor of Science in Computer Science', progCollege: 100 },
    { progID: 100002, progShortName: 'BSIT', progFullName: 'Bachelor of Science in Information Technology', progCollege: 100 },
    { progID: 100003, progShortName: 'BSEMC', progFullName: 'Bachelor of Science in Entertainment and Multimedia Computing', progCollege: 100 },
    { progID: 100004, progShortName: 'BSIS', progFullName: 'Bachelor of Science in Information Systems', progCollege: 100 },
    { progID: 101001, progShortName: 'BSA', progFullName: 'Bachelor of Science in Accountancy', progCollege: 101 },
    { progID: 101002, progShortName: 'BSMA', progFullName: 'Bachelor of Science in Management Accounting', progCollege: 101 },
    { progID: 101003, progShortName: 'BSBA', progFullName: 'Bachelor of Science in Business Administration', progCollege: 101 },
    { progID: 101004, progShortName: 'BSFM', progFullName: 'Bachelor of Science in Financial Management', progCollege: 101 },
    { progID: 101005, progShortName: 'BAPS', progFullName: 'Bachelor of Arts in Political Science', progCollege: 102 },
    { progID: 101006, progShortName: 'BACE', progFullName: 'Bachelor of Arts in Civil Engineering', progCollege: 103 },
    { progID: 101007, progShortName: 'BSE', progFullName: 'Bachelor of Science in Education', progCollege: 104 },
    { progID: 101008, progShortName: 'BSN', progFullName: 'Bachelor of Science in Nursing', progCollege: 105 },
    { progID: 101009, progShortName: 'BSN', progFullName: 'Bachelor of Science in Nursing', progCollege: 105 },
   ];

  studID: number;
  studFirstName: string;
  studLastName: string;
  studMidName: string;
  studYear: number;

  
  selectedCollege: College = null;
  
  filteredPrograms: Array<Program> = this.filterProgramsToCheck(this.selectedCollege);

  selectedProgram: Program = this.CheckOnStart();

  studentIdDetail: number = null;
  firstNameDetail: string = "";
  middleNameDetail: string = "";
  lastNameDetail: string = "";
  collegeDetail: College = null;
  programDetail: Program = null;
  yearDetail: number  = null;

  studentCollection: Array<Student> = [];


   selectedStudentToChange: Student = null;

  printable: boolean = false;
  showDetail: boolean = false;

  public saveStudentInfo(): void {
    const nameCheck = /^[a-zA-Z\s]+$/;
    const lastCheck = /^[a-zA-Z\s]{2,}$/;
    const idCheck = /^[0-9]+$/;
    const programSelectValue = '--- select program---';
    const collegeSelectValue = '--- select college---';
    const yearCheck = /^[1-4]$/;

    if (!idCheck.test(String(this.studID))) {
      alert('Student ID should only contain numbers.');
      return;
    }

    if (!lastCheck.test(this.studLastName)) {
      alert('Last name should be 2 letters or more.');
      return;
    }

    if (!nameCheck.test(this.studFirstName)) {
      alert('First name should only contain letters.');
      return;
    }

    if (this.studMidName && !nameCheck.test(this.studMidName)) {
      alert('Middle name should only contain letters.');
      return;
    }

    if (!this.selectedCollege || this.selectedCollege.colShortName === collegeSelectValue) {
       alert('Please select a valid college.');
       return;
      }
      
   if (!this.selectedProgram || this.selectedProgram.progShortName === programSelectValue) {
      alert('Please select a valid program.');
      return;
   }
    if (!yearCheck.test(String(this.studYear))) {
      alert('Year should be between 1 and 4.');
      return;
    }


    let studData: Student;

    studData = {
      studID: this.studID,
      studFirstName: this.studFirstName,
      studLastName: this.studLastName,
      studMidName: this.studMidName,
      studProgram: this.selectedProgram,
      studCollege: this.selectedCollege,
      studYear: this.studYear,
    };

    console.log(studData);

    if(this.studentCollection.find(element => element.studID === studData.studID))
    {
      alert('This Id already existing');
      return;
    }
    
    this.studentCollection.push(studData);
    this.printStudentEntries();
    this.clearEntries();
   }

   public filterProgramsToCheck(selectedCollege: College): Array<Program> {
     let filteredProgramsOnCheck: Array<Program>;

    if (selectedCollege  && selectedCollege.colShortName === 'SCS') {
      filteredProgramsOnCheck = this.programs.filter(program => ['BSIT','BSEMC','BSCS','BSIS'].includes(program.progShortName));
    } 
    else if (selectedCollege  && selectedCollege.colShortName === 'SBM') {
      filteredProgramsOnCheck = this.programs.filter(program => ['BSA','BSMA','BSBA','BSFM'].includes(program.progShortName));
    } 
    else if (selectedCollege  && selectedCollege.colShortName=== 'SAMS') {
      filteredProgramsOnCheck = this.programs.filter(program => ['BSN'].includes(program.progShortName));
    }
    else if (selectedCollege  && selectedCollege.colShortName === 'SAS') {
      filteredProgramsOnCheck = this.programs.filter(program => ['BAPS'].includes(program.progShortName));
    }
    else if (selectedCollege  && selectedCollege.colShortName === 'SOENG') {
      filteredProgramsOnCheck = this.programs.filter(program => ['BACE'].includes(program.progShortName));
    }
    else if (selectedCollege && selectedCollege.colShortName === 'SED') {
      filteredProgramsOnCheck = this.programs.filter(program => ['BSE'].includes(program.progShortName));
    }
    else
    filteredProgramsOnCheck = null;
    
    return filteredProgramsOnCheck;
  }

  public filterPrograms(college: College, programToChange: boolean): void {
    

  if (college && college.colShortName === 'SCS') {
    this.filteredPrograms = this.programs.filter(program => ['BSIT','BSEMC','BSCS','BSIS'].includes(program.progShortName));
  } 
  else if (college && college.colShortName === 'SBM') {
    this.filteredPrograms = this.programs.filter(program => ['BSA','BSMA','BSBA','BSFM'].includes(program.progShortName));
  } 
  else if (college && college.colShortName === 'SAMS') {
    this.filteredPrograms = this.programs.filter(program => ['BSN'].includes(program.progShortName));
  }
  else if (college && college.colShortName === 'SAS') {
    this.filteredPrograms = this.programs.filter(program => ['BAPS'].includes(program.progShortName));
  }
  else if (college && college.colShortName === 'SOENG') {
    this.filteredPrograms = this.programs.filter(program => ['BACE'].includes(program.progShortName));
  }
  else if (college && college.colShortName === 'SED') {
    this.filteredPrograms = this.programs.filter(program => ['BSE'].includes(program.progShortName));
  }
  else {
    this.filteredPrograms = null;
  }

  if(!programToChange)
    if(this.filteredPrograms != null)
      this.selectedProgram = this.filteredPrograms[0];
    else
      this.selectedProgram = null;
  else
  {
    if(this.filteredPrograms != null)
    {
      this.programDetail = this.filteredPrograms[0];
      console.log(this.programDetail);
    }
    else
      this.programDetail = null;
  }
  }

  public getProgramName(progID: number, short: boolean = null): string {
   let foundName = this.programs.find(element => element.progID === progID);

   short = short ?? true;
   return short ? foundName.progShortName : foundName.progFullName;
   }

 public getCollegeName(colID: number, short: boolean = null): string {
   let foundName = this.colleges.find(element => element.colID === colID);

   short = short ?? true;
   return short ? foundName.colShortName : foundName.colFullName;
   }
  
public RemoveLayer(studID: number)
{
  let studToFind = Number(this.studentCollection.find(element => element.studID === studID));

  this.studentCollection.splice(studToFind, 1);
  if(this.studentCollection.length <= 0)
    this.printable = false;
  this.showDetail = false;
}

public ShowDetail(stud: Student)
{
  this.studentIdDetail = stud.studID
  this.firstNameDetail = stud.studFirstName;
  this.middleNameDetail = stud.studMidName;
  this.lastNameDetail = stud.studLastName;
  this.collegeDetail = stud.studCollege;
  this.programDetail = stud.studProgram;
  this.yearDetail = stud.studYear;
  this.selectedStudentToChange = stud;
  this.showDetail = true;
}

public ChangeDetailStud()
{
  if (this.studentIdDetail <= 0 ) {
    alert(' To Change Student ID should not be empty.');
    return;
  }
  else if(this.studentIdDetail != this.selectedStudentToChange.studID && 
    this.studentCollection.find(element => element.studID === this.studentIdDetail))
  {
    alert('This Id already existing');
    return;
  }

  if(this.firstNameDetail == '')
  {
    alert("To Change First Name must not be empty.")
    return;
  }
  if(this.middleNameDetail == '')
  {
    alert("To Change Middle Name must not be empty.")
    return;
  }
  if(this.lastNameDetail == '')
  {
    alert("To Change Last Name must not be empty.")
    return;
  }
  if(this.collegeDetail == null)
  {
    alert("To Change Select a college.")
    return;
  }
  if(this.programDetail == null)
  {
    alert("To Change Select a program.")
    return;
  }
  if(this.yearDetail <= 0)
  {
    alert("To Change your Year must be higher.")
    return;
  }

  this.selectedStudentToChange.studID = this.studentIdDetail;
  this.selectedStudentToChange.studFirstName = this.firstNameDetail;
  this.selectedStudentToChange.studMidName = this.middleNameDetail;
  this.selectedStudentToChange.studLastName = this.lastNameDetail;
  this.selectedStudentToChange.studCollege = this.collegeDetail;
  this.selectedStudentToChange.studProgram = this.programDetail;
  this.selectedStudentToChange.studYear = this.yearDetail;
  this.showDetail = false;

  alert("Change Complete.")
}

 public clearEntries(): void {
   this.studID = null;
   this.studFirstName = '';
   this.studLastName = '';
   this.studMidName = '';
   this.selectedProgram = null;
   this.selectedCollege = null;
   this.studYear = null;
   this.printable = false;
   }

 public printStudentEntries(): void {
   this.printable = true;
   }

 public destroyCollection(): void {
   if (this.printable) {
     this.printable = false;
   }
   this.studentCollection = [];
   }

   CheckOnStart(): Program
   {
      if(this.filteredPrograms != null)
        return this.filteredPrograms[0];
      else
        return null;
   }
}