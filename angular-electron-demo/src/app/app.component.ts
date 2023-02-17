import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Angular-Electron-Demo';
  subtitle: string = '';

  checkIsFileAvailable: boolean = false;
  runExe: boolean = false;

  // test path:
  // "C:\Program Files (x86)\Notepad++\notepad++.exe"
  pathString: string = '';

  constructor() {}

  ngOnInit(): void {
    if (window.electronAPI !== undefined) {
      this.subtitle = 'Is Electron';
    } else {
      this.subtitle = 'No Electron';
    }
  }

  checkFileExists() {
    const filePath = window.electronAPI.checkFileExist(this.pathString);

    filePath.then((result) => {
      if (result) {
        this.checkIsFileAvailable = true;
        this.runExe = false;
      }
    });
  }

  startExe() {
    const openFile = window.electronAPI.startExecutableFile(this.pathString);

    openFile.then((result) => {
      if (result) {
        this.runExe = true;
        this.checkIsFileAvailable = false;
      }
    });
  }
}
