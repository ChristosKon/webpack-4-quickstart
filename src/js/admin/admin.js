import 'gentelella/vendors/fastclick/lib/fastclick.js';
import 'gentelella/vendors/nprogress/nprogress.js';
import 'gentelella/vendors/iCheck/icheck.min.js';
import 'gentelella/vendors/bootstrap-daterangepicker/daterangepicker.js';
import 'gentelella/vendors/datatables.net/js/jquery.dataTables.js';
import 'gentelella/vendors/datatables.net-bs/js/dataTables.bootstrap.js';
import 'gentelella/vendors/datatables.net-buttons/js/dataTables.buttons.js';
import 'gentelella/vendors/datatables.net-buttons-bs/js/buttons.bootstrap.js';
import 'gentelella/vendors/datatables.net-buttons/js/buttons.flash.js';
import 'gentelella/vendors/datatables.net-buttons/js/buttons.html5.js';
import 'gentelella/vendors/datatables.net-buttons/js/buttons.print.js';
import 'gentelella/vendors/datatables.net-fixedheader/js/dataTables.fixedHeader.js';
import 'gentelella/vendors/datatables.net-keytable/js/dataTables.keyTable.js';
import 'gentelella/vendors/datatables.net-responsive/js/dataTables.responsive.js';
import 'gentelella/vendors/datatables.net-responsive-bs/js/responsive.bootstrap.js';
import 'gentelella/vendors/datatables.net-scroller/js/dataTables.scroller.js';
import 'gentelella/vendors/jszip/dist/jszip.js';
import 'gentelella/vendors/pdfmake/build/pdfmake.min.js';
import 'gentelella/vendors/pdfmake/build/vfs_fonts.js';
import 'clockpicker/dist/bootstrap-clockpicker.min.js';
import 'chosen-js';
import 'gentelella/build/js/custom.min.js';
import $ from 'jquery';

$(document).ready(function() {
    var $datatable = $('#datatable-checkbox');
    $datatable.dataTable({
        //            dom: "Bfrtip",
        //            buttons: [
        //                {
        //                    extend: "copy",
        //                    className: "btn-sm"
        //                },
        //                {
        //                    extend: "csv",
        //                    className: "btn-sm"
        //                },
        //                {
        //                    extend: "excel",
        //                    className: "btn-sm"
        //                },
        //                {
        //                    extend: "pdfHtml5",
        //                    className: "btn-sm"
        //                },
        //                {
        //                    extend: "print",
        //                    className: "btn-sm"
        //                }
        //            ],
        responsive: true,
        fixedHeader: true,
        keys: true,
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ],
        //            'order': [[1, 'asc']],
        //            'columnDefs': [
        //                {orderable: false, targets: [0]}
        //            ]
    });
    $datatable.on('draw.dt', function() {
        $('input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
        });
    });

    var TableManageButtons = {
        init: function() {
            handleDataTableButtons();
        }
    };

    $('#datatable').dataTable({
        "lengthMenu": [
            [10, 25, 50, -1],
            [10, 25, 50, "All"]
        ]
    });
    $('#datatable-keytable').DataTable({
        keys: true
    });

    $('#datatable-responsive').DataTable();

    $('#datatable-scroller').DataTable({
        ajax: "js/datatables/json/scroller-demo.json",
        deferRender: true,
        scrollY: 380,
        scrollCollapse: true,
        scroller: true
    });

    var table = $('#datatable-fixed-header').DataTable({
        fixedHeader: true
    });

    TableManageButtons.init();
});
