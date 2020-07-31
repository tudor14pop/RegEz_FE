import { Component, OnInit } from '@angular/core';
import { LabelService } from 'src/app/services/label.service.js';
declare var $: any;


@Component({
  selector: 'app-master-files',
  templateUrl: './master-files.component.html',
  styleUrls: ['./master-files.component.scss']
})
export class MasterFilesComponent implements OnInit {
numbers;
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
pageCount = document.getElementById('page_count');

  constructor(public labelService: LabelService) { }

  async ngOnInit(): Promise<void> {
    this.canvas = ( document.getElementById('the-canvas') as HTMLCanvasElement);
    this.ctx = this.canvas.getContext('2d');
    this.numbers = Array(50).fill(0).map((x, i) => i);
    $('.footable').footable();
    $('.footable2').footable();
    $('#jstree1').jstree({
      core : {
          check_callback : true
      },
      plugins : [ 'types', 'dnd' ],
      types: {
          default: {
              icon: 'fa fa-folder'
          },
          html: {
              icon: 'fa fa-file-code-o'
          },
          svg: {
              icon: 'fa fa-file-picture-o'
          },
          css: {
              icon: 'fa fa-file-code-o'
          },
          img: {
              icon: 'fa fa-file-image-o'
          },
          js: {
              icon: 'fa fa-file-text-o'
          }
      }
});
    const pdfjs = await import('../../../scripts/pdf.js');
    const pdfjsWorker = await import('../../../scripts/pdf.worker.js');
    pdfjs.workerSrc = pdfjsWorker;

    pdfjs.getDocument(this.url).then((pdfDoc_) => {
        if (this.pdfDoc) {
            this.pdfDoc.destroy();
        }
        this.pdfDoc = pdfDoc_;
        const documentPagesNumber = this.pdfDoc.numPages;
        this.totalPageNumber = documentPagesNumber;
        this.pageCount  = documentPagesNumber;
        const selfRef = this;
        $('#page_num').on('change', function() {
            const pageNumber = Number($(this).val());
            if (pageNumber > 0 && pageNumber <= documentPagesNumber) {
                selfRef.queueRenderPage(pageNumber, this.scale);
            }
        });
    });
  }

renderPage(num, scale) {
      this.pageRendering = true;
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

}
