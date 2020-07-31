import { Component, OnInit, DoCheck, AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { UploadFileDialogComponent } from '../../common/upload-file-dialog/upload-file-dialog.component.js';
import { MatDialog } from '@angular/material/dialog';
import { NewFolderDialogComponent } from '../../common/new-folder-dialog/new-folder-dialog.component.js';
import { ActivatedRoute } from '@angular/router';
import { FileService } from 'src/app/services/file.service.js';
import { FolderStructure } from 'src/app/models/folder-structure.model.js';
import { saveAs } from 'file-saver';
import { delay } from 'rxjs/operators';
import print from 'print-js';
import { StudyService } from 'src/app/services/http/study.service.js';
import printJS from 'print-js';
import { EditStudyFileDialogComponent } from '../../common/edit-study-file-dialog/edit-study-file-dialog.component.js';
import { LabelService } from 'src/app/services/label.service.js';
declare var $: any;


@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudyComponent implements OnInit {
  numbers;
  justFolders: FolderStructure[] = [];
  actualFile;
  initDone = false;
  folders: FolderStructure[] = [];
  url = null;
  pdfDoc = null;
  pageNum = 1;
  pageRendering = false;
  pageNumPending = null;
  totalPageNumber = null;
  scale = 1;
  zoomRange = 0.25;
  canvas = null;
  ctx = null;
  studyID = '';

    constructor(private dialog: MatDialog,
                private route: ActivatedRoute,
                private fileService: FileService,
                private ref: ChangeDetectorRef,
                private studyService: StudyService,
                public labelService: LabelService) {
                }

     ngOnInit() {
      this.route.params.subscribe(params => { this.studyID = params.id; });
      this.fileService.retrieveFolderStructure(this.studyID).subscribe(res => {
          Object.keys(res.filePathsByPath).map(key => {
              this.folders.push(res.filePathsByPath[key]);
              res.filePathsByPath[key].forEach(element => {
                if (element.fileType === 'FOLDER') {
                    this.justFolders.push(element);
                }
             });
        });
          this.ref.detectChanges();
      }, err => {
          console.log(err);
      });
      console.log(this.folders)
      this.canvas = ( document.getElementById('the-canvas') as HTMLCanvasElement);
      this.ctx = this.canvas.getContext('2d');
      this.numbers = Array(50).fill(0).map((x, i) => i);
      $('.footable').footable();
      $('.footable2').footable();
      setTimeout(() => {
        $('#jstree1').jstree({
            core : {
                check_callback : true,
            },
            plugins : [ 'search', 'themes', 'types', 'dnd' ],
            types: {
                pdf: {
                    icon: 'fa fa-file'
                },
                default: {
                    icon: 'fa fa-folder'
                },
           },
      });
        this.initDone = true;
    }, 0);
      $('#jstree1').on('select_node.jstree', (e, data) => {
        if ( data.node.icon !== 'fa fa-folder') {
            this.retrieveFile(data.node.id);
        }
        });
    }

    async previewFile(url) {
        const pdfjs = await import('../../../../scripts/pdf.js');
        const pdfjsWorker = await import('../../../../scripts/pdf.worker.js');
        pdfjs.workerSrc = pdfjsWorker;

        pdfjs.getDocument(url).then((pdfDoc) => {
            if (this.pdfDoc) {
                this.pdfDoc.destroy();
            }
            this.pdfDoc = pdfDoc;
            const documentPagesNumber = this.pdfDoc.numPages;
            this.totalPageNumber = documentPagesNumber;
            document.getElementById('page_count').textContent = '/ ' + documentPagesNumber;
            const selfRef = this;
            $('#page_num').on('change', function() {
                const pageNumber = Number($(this).val());
                if (pageNumber > 0 && pageNumber <= documentPagesNumber) {
                    selfRef.queueRenderPage(pageNumber, this.scale);
                }
            });
            this.renderPage(this.pageNum, this.scale);
        });
    }

    openFileDialog() {
        const dialogRef = this.dialog.open(UploadFileDialogComponent , {
            height: '40rem',
            width: '30rem',
            data: {
                studyID: this.studyID,
                folders: this.justFolders,
            }
        });
    }

    openEditFileDialog() {
        const dialogRef = this.dialog.open(EditStudyFileDialogComponent, {
            height: '28rem',
            width: '30rem',
        });
    }

    openFolderDialog() {
        const dialogRef = this.dialog.open(NewFolderDialogComponent , {
            height: '20rem',
            width: '30rem',
            data: {
                studyID: this.studyID,
                folders: this.justFolders,

            }
        });
    }
  renderPage(num, scale) {
        this.pageRendering = true;
        this.pageNum = num;
        this.pdfDoc.getPage(num).then((page) => {
            const viewport = page.getViewport(scale);
            this.canvas.height = viewport.height;
            this.canvas.width = viewport.width;

            const renderContext = {
                canvasContext: this.ctx,
                viewport
            };

            const renderTask = page.render(renderContext);
            if (this.ctx) {
              this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
              this.ctx.beginPath();
          }
            renderTask.promise.then(() => {
                  this.pageRendering = false;
                  if (this.pageNumPending !== null) {
                      // New page rendering is pending
                      this.renderPage(this.pageNumPending, scale);
                      this.pageNumPending = null;
                  }
              },
              (error) => {
                console.log(error);
              }
            );
        });
    }

  queueRenderPage(num, scale) {
        if (this.pageRendering) {
            this.pageNumPending = num;
        } else {
            this.renderPage(num, scale);
        }
    }

  onPrevPage() {
        if (this.pageNum <= 1) {
            return;
        }
        this.pageNum--;
        const scale = this.scale;
        this.queueRenderPage(this.pageNum, scale);
    }


  onNextPage() {
        if (this.pageNum >= this.pdfDoc.numPages) {
            return;
        }
        this.pageNum++;
        const scale = this.scale;
        this.queueRenderPage(this.pageNum, scale);
    }

   onZoomIn() {
        if (this.scale >= this.pdfDoc.scale) {
            return;
        }
        this.scale += this.zoomRange;
        const num = this.pageNum;
        this.renderPage(num, this.scale);
    }

  onZoomOut() {
        if (this.scale >= this.pdfDoc.scale) {
            return;
        }
        this.scale -= this.zoomRange;
        const num = this.pageNum;
        this.queueRenderPage(num, this.scale);
    }

  onZoomFit() {
        if (this.scale >= this.pdfDoc.scale) {
            return;
        }
        this.scale = 1;
        const num = this.pageNum;
        this.queueRenderPage(num, this.scale);
    }

    retrieveFile(id) {
        this.pageNum = 1;
        const data = {
            studyID: this.studyID,
            fileID: id
        };
        this.fileService.retrieveFile(data).subscribe(res => {
            this.url = res;
            this.previewFile(res);
            this.actualFile = res;
        }, err => {
            console.log(err);
        });
    }

    ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint16Array(buf));
    }

    printFile() {
        if (this.url === null) {
            this.studyService.showError('Please select a PDF first.');
        } else {
            const base64String = btoa(String.fromCharCode(...new Uint8Array(this.url)));
            printJS({printable: base64String, type: 'pdf', showModal: false,  base64: true});
        }
    }
    downloadFile() {
        const blob = new Blob([this.actualFile], { type: 'application/pdf' });
        saveAs(blob, this.pdfDoc.pdfInfo.fingerprint);
    }
}




