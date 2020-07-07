import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'app-master-files',
  templateUrl: './master-files.component.html',
  styleUrls: ['./master-files.component.scss']
})
export class MasterFilesComponent implements OnInit {
numbers;
url = '../../assets/example.pdf';
pdfDoc = null;
pageNum = 1;
pageRendering = false;
pageNumPending = null;
scale = 1.5;
zoomRange = 0.25;
canvas = null;
ctx = null;

  constructor() { }

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
        this.pdfDoc = pdfDoc_;
        const documentPagesNumber = this.pdfDoc.numPages;
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

  // TODO: rewrite these functions into our components

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

          const renderTask =page.render(renderContext);
          renderTask.promise.then(() => {
                const pageRendering = false;
                if (this.pageNumPending !== null) {
                    // New page rendering is pending
                    this.renderPage(this.pageNumPending, scale);
                    const pageNumPending = null;
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
      const scale = this.pdfDoc.scale;
      this.queueRenderPage(this.pageNum, scale);
  }
// document.getElementById('prev').addEventListener('click', onPrevPage);

onNextPage() {
      if (this.pageNum >= this.pdfDoc.numPages) {
          return;
      }
      this.pageNum++;
      const scale = this.pdfDoc.scale;
      this.queueRenderPage(this.pageNum, scale);
  }
// document.getElementById('next').addEventListener('click', onNextPage);

 onZoomIn() {
      if (this.scale >= this.pdfDoc.scale) {
          return;
      }
      this.scale += this.zoomRange;
      const num = this.pageNum;
      this.renderPage(num, this.scale);
  }
// document.getElementById('zoomin').addEventListener('click', onZoomIn);

onZoomOut() {
      if (this.scale >= this.pdfDoc.scale) {
          return;
      }
      this.scale -= this.zoomRange;
      const num = this.pageNum;
      this.queueRenderPage(num, this.scale);
  }
// document.getElementById('zoomout').addEventListener('click', onZoomOut);

onZoomFit() {
      if (this.scale >= this.pdfDoc.scale) {
          return;
      }
      this.scale = 1;
      const num = this.pageNum;
      this.queueRenderPage(num, this.scale);
  }
// document.getElementById('zoomfit').addEventListener('click', onZoomFit);

}
