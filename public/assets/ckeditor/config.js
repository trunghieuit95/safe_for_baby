/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ]}, // xem nguoi trang. 
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },// cut
		{ name: 'editing',     groups: [ 'find', 'selection'/*, 'spellchecker'*/ ] },//
		
		/*{ name: 'forms' },*/// form
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },// can phai, can trai, list
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align' ] },
		/*{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },*/
		{ name: 'links' },// link
		{ name: 'insert' },// chen anh
		'/',		
		{ name: 'styles' },// thay doi phong, add the h,em,strong
		{ name: 'colors' },
		/*{ name: 'about' },*/
		
		{ name: 'tools' }
	];

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	//config.removeButtons = 'Underline,Subscript,Superscript';

	// Set the most common block elements.
	//config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';
	config.removeDialogTabs = 'image:Link';
	config.removePlugins = 'save,print,newpage,templates,find,about,showblocks,undo,redo,Anchor,flash,styles,iframe,specialchar,subscript'; // an bot nut.

	config.skin = 'bootstrapck';
	config.image2_captionedClass = 'image-captioned';
};

CKEDITOR.on('dialogDefinition', function(ev) {
    // Take the dialog name and its definition from the event data.
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;

    // Check if the definition is from the dialog we're
    // interested in (the 'link' dialog).
    if (dialogName == 'link') {
//        Remove the 'Upload' and 'Advanced' tabs from the 'Link' dialog.
//        dialogDefinition.removeContents('upload');
//        dialogDefinition.removeContents('advanced');

        // Get a reference to the 'Link Info' tab.
        /*var infoTab = dialogDefinition.getContents('info');
        // Remove unnecessary widgets from the 'Link Info' tab.
        infoTab.remove('linkType');
        infoTab.remove('protocol');
        infoTab.remove('browse');

        // Get a reference to the "Target" tab and set default to '_blank'
        var targetTab = dialogDefinition.getContents('target');
        var targetField = targetTab.get('linkTargetType');
        targetField['default'] = '_blank';*/

    } else if (dialogName == 'image') {
//        Remove the 'Link' and 'Advanced' tabs from the 'Image' dialog.
//        dialogDefinition.removeContents('Link');
//        dialogDefinition.removeContents('advanced');

        // Get a reference to the 'Image Info' tab.
        var infoTab = dialogDefinition.getContents('info');
        // Remove unnecessary widgets/elements from the 'Image Info' tab.
        infoTab.remove('browse');
        infoTab.remove('txtHSpace');
        infoTab.remove('txtVSpace');
        infoTab.remove('txtBorder');
        // infoTab.remove('cmbAlign');

    }
});
