document.body.innerHTML = document.body.innerHTML.concat(`<!--Modal popup blackbox-->
<button type="button" id="modalButton" data-toggle="modal" data-target="#myModal" style="position: fixed; display: none;"></button>
<div class="modal fade" id="myModal" role="dialog" data-backdrop="static">
    <div class="vertical-alignment-helper">
        <div class="modal-dialog modal-lg modal-dialog-centered vertical-align-center">
            <div class="modal-content" style="border-radius: 12px">
                <div class="modal-header">
                    <h4 class="modal-title" style="text-shadow: 0px 0px 8px #000000;" id="modalbox-title">Placeholder title</h4>
                </div>
                <div class="modal-body" id="modalbox-body">Placeholder body</div>
                <div class="modal-footer">
                    <button type="button" class="modal-button" data-dismiss="modal"><span style="margin-left: 5px; margin-right: 5px;" id="modalbox-button-text">Placeholder button text</span></button>
                </div>
            </div>
        </div>
    </div>
</div>
<!--/Modal popup blackbox-->`);