var header = $("meta[name='_csrf_header']").attr('content');
var token = $("meta[name='_csrf']").attr('content');

function toggleTextbox(checkbox, textboxId) {
    var textbox = document.getElementById(textboxId);
    if (checkbox.checked) {
        textbox.style.display = 'block'; // 텍스트 필드를 보여줍니다.
        textbox.disabled = false; // 텍스트 필드를 활성화합니다.
        textbox.focus(); // 텍스트 필드에 포커스를 줍니다.
    } else {
        textbox.style.display = 'none'; // 텍스트 필드를 숨깁니다.
        textbox.disabled = true; // 텍스트 필드를 비활성화합니다.
        textbox.value = ''; // 텍스트 필드의 내용을 초기화합니다.
    }
}

function writesave() {
    var title = $("#title").val();
    // var nickname = $("#nickname").val();
    var nickname = $("#nickname").length > 0 ? $("#nickname").val() : null;
    var detail = editor.getHTML();
    var category = $("#category").val();
    var outerwear = $('#chkOuterwear').is(':checked') ? $("#outerwearInput").val() : null;
    var top = $('#chkTop').is(':checked') ? $("#topInput").val() : null;
    var bottom = $('#chkBottom').is(':checked') ? $("#bottomInput").val() : null;
    var shoes = $('#chkShoes').is(':checked') ? $("#shoesInput").val() : null;
    var acc = $('#chkAcc').is(':checked') ? $("#accInput").val() : null;



    // 콘텐츠 입력 유효성 검사
    // 마크다운으로 가져온 이유는 비교가 더 단순함
    if (editor.getMarkdown().length < 1) {
        alert('에디터 내용을 입력해 주세요.');
        throw new Error('editor content is required!');
    }

    if (title.length < 1) {
        alert('제목을 입력해 주세요.');
        throw new Error('editor content is required!');
    }

    if (category == null || category == '') {
        alert('카테고리를 선택해 주세요.');
        throw new Error('editor content is required!');
    }

    // API 호출을 위한 파라미터 세팅
    var url = '/board/board_write';
    var params = {
        title: title,
        detail: detail,
        nickname: nickname,
        category: category,
        outerwear: outerwear,
        top: top,
        bottom: bottom,
        shoes: shoes,
        acc: acc
    }

    // AJAX를 사용한 API 호출
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
        },
        success: function (data) {
            alert('게시글이 저장되었습니다.');
            location.href = '/board/board_list';
        },
        error: function (error) {
            console.error('저장 실패 : ', error);
        },
    });
}


// async function writesave() {
//     var title = $("#title").val();
// var nickname = $("#nickname").val();
// var detail = editor.getHTML();
// var categorie = $("#categorie").val();


// 콘텐츠 입력 유효성 검사
// 마크다운으로 가져온 이유는 비교가 더 단순함
// if (editor.getMarkdown().length < 1) {
//     alert('에디터 내용을 입력해 주세요.');
//     throw new Error('editor content is required!');
// }

// if (title.length < 1) {
//     alert('제목을 입력해 주세요.');
//     throw new Error('editor content is required!');
// }

// if (categorie == null || categorie == '') {
//     alert('카테고리를 선택해 주세요.');
//     throw new Error('editor content is required!');
// }

// // API 호출을 위한 파라미터 세팅
// var url = '/board/board_write';
// var params = {
//     title: title,
//     detail: detail,
//     nickname: nickname,
//     categorie: categorie
// }

//     // 3. API 호출
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 [header]: token,
//             },
//             body: JSON.stringify(params),
//         });

//         const idx = response.json();
//         alert(idx + '번 게시글이 저장되었습니다.');
//         location.href = '/board/board_list';

//     } catch (error) {
//         console.error('저장 실패 : ', error)
//     }
// }
