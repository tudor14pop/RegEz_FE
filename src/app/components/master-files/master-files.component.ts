import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-master-files',
  templateUrl: './master-files.component.html',
  styleUrls: ['./master-files.component.scss']
})
export class MasterFilesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
  }

  //TODO: rewrite these functions into our components

// let url = './pdf/example.pdf';
//   let pdfDoc = null,
//           pageNum = 1,
//           pageRendering = false,
//           pageNumPending = null,
//           scale = 1.5,
//           zoomRange = 0.25,
//           canvas = document.getElementById('the-canvas'),
//           ctx = canvas.getContext('2d');

//   /**
//    * Get page info from document, resize canvas accordingly, and render page.
//    * @param num Page number.
//    */
// function renderPage(num, scale) {
//       pageRendering = true;
//       // Using promise to fetch the page
//       pdfDoc.getPage(num).then(function(page) {
//           let viewport = page.getViewport(scale);
//           canvas.height = viewport.height;
//           canvas.width = viewport.width;

//           // Render PDF page into canvas context
//           let renderContext = {
//               canvasContext: ctx,
//               viewport: viewport
//           };
//           let renderTask = page.render(renderContext);

//           // Wait for rendering to finish
//           renderTask.promise.then(function () {
//               pageRendering = false;
//               if (pageNumPending !== null) {
//                   // New page rendering is pending
//                   renderPage(pageNumPending);
//                   pageNumPending = null;
//               }
//           });
//       });

//       // Update page counters
//       document.getElementById('page_num').value = num;
//   }

//   /**
//    * If another page rendering in progress, waits until the rendering is
//    * finised. Otherwise, executes rendering immediately.
//    */
// function queueRenderPage(num) {
//       if (pageRendering) {
//           pageNumPending = num;
//       } else {
//           renderPage(num,scale);
//       }
//   }

//   /**
//    * Displays previous page.
//    */
// function onPrevPage() {
//       if (pageNum <= 1) {
//           return;
//       }
//       pageNum--;
//       let scale = pdfDoc.scale;
//       queueRenderPage(pageNum, scale);
//   }
// document.getElementById('prev').addEventListener('click', onPrevPage);

//   /**
//    * Displays next page.
//    */
// function onNextPage() {
//       if (pageNum >= pdfDoc.numPages) {
//           return;
//       }
//       pageNum++;
//       let scale = pdfDoc.scale;
//       queueRenderPage(pageNum, scale);
//   }
// document.getElementById('next').addEventListener('click', onNextPage);

//   /**
//    * Zoom in page.
//    */
// function onZoomIn() {
//       if (scale >= pdfDoc.scale) {
//           return;
//       }
//       scale += zoomRange;
//       let num = pageNum;
//       renderPage(num, scale)
//   }
// document.getElementById('zoomin').addEventListener('click', onZoomIn);

//   /**
//    * Zoom out page.
//    */
// function onZoomOut() {
//       if (scale >= pdfDoc.scale) {
//           return;
//       }
//       scale -= zoomRange;
//       let num = pageNum;
//       queueRenderPage(num, scale);
//   }
// document.getElementById('zoomout').addEventListener('click', onZoomOut);

//   /**
//    * Zoom fit page.
//    */
// function onZoomFit() {
//       if (scale >= pdfDoc.scale) {
//           return;
//       }
//       scale = 1;
//       let num = pageNum;
//       queueRenderPage(num, scale);
//   }
// document.getElementById('zoomfit').addEventListener('click', onZoomFit);


//   /**
//    * Asynchronously downloads PDF.
//    */
// PDFJS.getDocument(url).then(function (pdfDoc_) {
//       pdfDoc = pdfDoc_;
//       let documentPagesNumber = pdfDoc.numPages;
//       document.getElementById('page_count').textContent = '/ ' + documentPagesNumber;

//       $('#page_num').on('change', function() {
//           let pageNumber = Number($(this).val());

//           if(pageNumber > 0 && pageNumber <= documentPagesNumber) {
//               queueRenderPage(pageNumber, scale);
//           }

//       });

//       // Initial/first page rendering
//       renderPage(pageNum, scale);
//   });

}
