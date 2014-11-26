
Qva.LoadCSS("/QvAjaxZfc/QvsViewClient.aspx?public=only&type=document&name=Extensions/com.capventis.SelectionTags/style.css");

Qva.AddDocumentExtension("com.capventis.SelectionTags",
	function() {


		 // Get the chart ID from the QlikView document - will be something like "CH2340091" or "CH01"
		 var divName = "capventis_Selection_Tags";
		 
		 // Set the inner html of the extension object to a div, including the chart id, that we can use in code
		 if($("#div_"+divName).length==0)
		 {
			var divHTML='<div class="borderbox" id="div_' + divName + '">' 
				+'<ul class="navlist" id="ul_' + divName + '">'
				+'</ul>'
				+'</div>';
				
			// Look for a capventis_DocHeader, in which case, position after it 
			if($(".capventis_DocHeader").length>0)  
			{
				$(".capventis_DocHeader").after(divHTML);
			}
			// If we don't have a doc header, we can position after the toolbar 
			else if($("#QvAjaxToolbar").length>0)
			{
				$("#QvAjaxToolbar").after(divHTML);
			}
			// If the toolbar doesn't exist (e.g. in Desktop Web View), we can look for the tabrow and position before 
			else if($("#Tabrow").length>0)
			{
				$('#Tabrow').before(divHTML);
			}
			// Potentially worst case, we position directly above the main PageContainer - which should always exist!
			else
			{
				$('#PageContainer').before(divHTML);
			}
			
			// Note that in SR9 of QV11.2, the Tabrow is not discovered at this step.  This should not be a problem
			// In production because the Toolbar should be there.  If the toolbar isn't there - as in the Desktop
			// web view, then it will fall through to the PageContainer and then the tabrow might be above the 
			// selection tags.
			
		 }
		
		 // Get the current selections
		 Qv.GetCurrentDocument().GetCurrentSelections({
			 onChange: function () {
				 
				 // Clear the current UL 
				 $("#ul_"+divName).empty();
				 
				 var lButtons='<li class="navlist">'
					+'<table><tr><td class="navbutton">'
					+'<span title="Back"><a href="#" onclick="backSelections()"><img alt="Back" height="40" width="40" src="/QvAjaxZfc/QvsViewClient.aspx?public=only&type=document&name=Extensions/com.capventis.SelectionTags/back_button.png"></img></a></span>'
					+'</td><td class="navbutton">'
					+'<span title="Forward"><a href="#" onclick="forwardSelections()"><img alt="Back" height="40" width="40" src="/QvAjaxZfc/QvsViewClient.aspx?public=only&type=document&name=Extensions/com.capventis.SelectionTags/forward_button.png"></img></a></span>'
					+'</td><td class="navbutton">'
					+'<span title="Clear"><a href="#" onclick="clearSelections()"><img alt="Clear" height="40" width="40" src="/QvAjaxZfc/QvsViewClient.aspx?public=only&type=document&name=Extensions/com.capventis.SelectionTags/clear_button.png"></img></a></span>'
					+'</li>';
				 $('#ul_'+divName).append(lButtons);
				 
				 
				 var f, data = this.Data.Rows;
				 for (f = 0; f < data.length; f++) {
					 //alert(data[f][0].text + ":" + data[f][2].text);
					 
					var vLi='<li class="navlist">' 
						+ '<table><tr><td>'
						+ '   <div>'
						+ '      <span class="navlistfieldname" title="' + data[f][0].text + ': ' + data[f][2].text + '">' + data[f][0].text + '</span>'
						+ '   </div>'
						+ '   <span class="navlistvalues" title="' + data[f][0].text + ': ' + data[f][2].text + '">' + data[f][2].text + '</span>'
						+ '</td>'
						+ '<td class="navlistcancel">'
						+ '   <a href="#" onclick="clickToClear(\'varCurrentSelections\',\'' +data[f][0].text +'\')"><img alt class="Qv_CellIcon_right Qv_CD" src="/QvAjaxZfc/QvsViewClient.aspx?public=only&type=document&name=Extensions/com.capventis.SelectionTags/cancel_icon.png"></img></a>'
						+ '</td></tr></table>'
						+ '</li>';
					//alert(vLi);
					$('#ul_'+divName).append(vLi);
				 }
			 }
		 });
		 
	});
			 
function clickToClear(vVariableName, fieldName) {
	Qv.GetCurrentDocument().SetVariable(vVariableName, fieldName)
}

function clearSelections() {
	Qv.GetCurrentDocument().Clear();
}

function backSelections() {
	Qv.GetCurrentDocument().Back();
}

function forwardSelections() {
	Qv.GetCurrentDocument().Forward();
}
