module.exports = {
    get_index : function(req, res) {
        res.send("Hello visitor!");
    },
    post_index : function(req, res) {
        res.send("A post");
    },
    get_recent : function(req, res) {
        res.send("More recent streams");
    },
    get_index : function(req, res, id) {
        res.send("You are requesting the stream with id: " + id);
    },
    get_id_chat : function(req, res, id) {
        res.send("You are requesting the chat of the stream with id: " + id);
    },
    get_userName_streams : function(req, res, userName) {
        res.send("You are requesting the streams of the person with user name: " + userName);
    }
}