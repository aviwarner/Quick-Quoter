$(function() {
  let client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '200px' });
  client.get('ticket').then(function(data) {
    let ticket_id = data.ticket['id'];
    requestTicketInfo(client, ticket_id);
  });
});

function mainInterface(data) {
  let ticket_data = {
    'number': data.ticket.id
  };

  let source = $("#main-template").html();
  let template = Handlebars.compile(source);
  let html = template(ticket_data);
  $("#content").html(html);
  console.log(ticket_data);
}

function requestTicketInfo(client, id) {
  let settings = {
    url: `/api/v2/tickets/${id}.json`,
    type: 'GET',
    dataType: 'json'
  };

  client.request(settings).then(
    function(data) {
      mainInterface(data);
    },
    function(response) {
      console.log(response);
    }
  );
}
