//''''''''''''''''''''''''' 
//'                       '
//'<Danny Hilario Suarez/>'
//'                       '
//'''''''''''''''''''''''''




var SLIDE_SPEED = 10;                       //Speed for slideUp and slideDown, replace to your preference.
	var subRows;
	var div_space;
	var div_detail;
	var div_rows;
	var img;
	var widthColumm = '200';                    //Columms width, replace width to your preference.
	var maxWidthColumm = '250';                 //Columms max-width, replace max-width to your preference.
	var page = 'page';                          //Replace with page you want to do request.
	var imgPlus = "../../images/plus.png";      //Replace with url image (+).
	var imgMinus = "../../images/minus.png";    //Replace with your url image (+).
	var selectorSelected = 'div.DHS';           //Replace with your selector to capture onclick event (If you want you can leave div.DHS and put .DHS class in your parent div).
	var imgMoreBtn = "img.imgBtn"               //Selector to find the image(imgPlus and imgMinus image have to have .imgBtn class or you can change the class to your preference).
	var id = '1';                               //Assign the id you want to consult.
	var colummJson = {                          //Declares the names of the columns.
		'Columm':
			[
				{ 'title': 'First Columm' },
				{ 'title': 'Second Columm' },
				{ 'title': 'Third Columm' }
			]
	};

	var classColumms = {                        //Assign the style to columms, you can change to your preference.
		'display': 'table-cell',
		'border-right': '1px solid #e0e0e0',
		'vertical-align': 'top',
		'padding': '5px 5px',
		'overflow': 'overlay',
		'width': widthColumm + 'px',
		'max-width': maxWidthColumm + 'px'
	}

	$(selectorSelected).on('click', function (e) {
		e.stopPropagation();
		this.img = $(this).find(imgMoreBtn);

		if (this.img.attr("src").indexOf("plus") > -1) {
			openDetail(this, this.img, colummJson);
			var data = {
				ID: id,
				isDetail: true
			};
			$.ajax({
				url: page,
				data: data,
				type: 'POST',
				dataType: 'JSON',
				success: successQuery
			});
		}
		else {
			closeSubDetailRows(this.img);
		}
	});

	function successQuery(data) {
		var row = $(".detailRows:last-child");

		for (var i = 0; i < data.Columms.length; i++) {
			$('span', row).eq(0).html(data.FirstColumm[i]);
			$('span', row).eq(1).html(data.SecondColumm[i]);
			$('span', row).eq(2).html(data.ThirdColumm[i]);
			$("#div_dDetail").append(row);
			row = $(".detailRows:last-child").clone(true);
		}
		$('#div_detail').slideDown(SLIDE_SPEED);
	}

	function openDetail(obj, img, colummJson) {
		removeAll(img);
		colummJson = JSON.parse(JSON.stringify(colummJson));

		this.div_detail = $('<div id="div_detail" class="DetailSubRow" style="display:none">');
		var gridColumm = $('<div id="div_headers" class="KDheaders gridDetail">').appendTo(this.div_detail);
		this.div_detail.append($('<div id="div_data" class="KD_GridData"><div id="div_rows" class="detailRows"/></div>'));
		 
		$.each(colummJson.Columm, function (i) {
			var titleColumm = $('<div><div><span class="sortableColumn ">' + colummJson.Columm[i].title + '</span></div></div>');
			titleColumm.css(classColumms);
			titleColumm.appendTo(gridColumm);
		});

		$(obj).after($('<div>').append(this.div_detail).append($('<div id="div_space"></br></div>')));
		this.div_rows = $('#div_rows');

		for (var i = 0; i < colummJson.Columm.length; i++) {
			$(this.div_rows).append($('<div class="row"><div><span></span></div></div>'));
			$('.row').css(classColumms);
		}

		$(img).attr("src", imgMinus);
		this.div_space = $('#div_space');
	}

	function removeAll(img) {
		var img = $(imgMoreBtn);
		img.attr("src", imgPlus);

		if ($(img).attr("src").indexOf("minus") > -1)
			$(img).attr("src", imgPlus);

		$(this.div_space).remove();
		$(this.div_detail).remove();
	}

	function closeSubDetailRows(img) {
		var img = $(imgMoreBtn);
		img.attr("src", imgPlus);

		$(this.div_detail).slideUp(SLIDE_SPEED);
		$(this.div_space).remove();
		var delayMillis = 500;

		setTimeout(function () {
			(this.div_detail).remove();
		}, delayMillis);
	}