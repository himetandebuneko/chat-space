$(function(){
  last_message_id = $('.message:last').data("message-id");
  
    function buildHTML(message){
      if ( message.image ) {
        var html =
          `<div class="chat-main__message-list__message" data-message-id= message.id>
            <div class="message">
              <div class="message__user-name">
                ${message.user_name}
              </div>
              <div class="message__info">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} ></img>
          </div>`
        return html;
      }else{
        var html =
          `<div class="chat-main__message-list__message" data-message-id= message.id>
            <div class="message">
              <div class="message__user-name">
                ${message.user_name}
              </div>
              <div class="message__info">
                ${message.created_at}
              </div>
            </div>
            <div class="lower-message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html).animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function(){
        alert("メッセージ送信に失敗しました")
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
     if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat-main__message-list').append(insertHTML);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".message-form").prop("disabled",false);
     }
    })
    .fail(function() {
      alert("自動更新に失敗しました")
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
   setInterval(reloadMessages, 7000);
  }
});