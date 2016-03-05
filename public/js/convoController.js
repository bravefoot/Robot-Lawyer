var converse = function(index)
{
    convoController(index, controllerCallback);
};

var controllerCallback = function(type, params, setter)
{
    onUserPost.push(value =>
    {
        if(type === "regex")
        {
            setter(params.exec(value)[0]);
        }
        else
        {
            setter(value);
        }
    });
};

var convoController = function(index, callback)
{
    var component = conversation[index];
    if(component.text != null)
    {
        postBotMessage(component.text);
    }
    else if(component.keywords != null)
    {
        callback("keywords",null,function(response)
        {
            component.keywords.forEach(key => 
            {
                if(response.contains(key)) 
                {
                    convoController(index + 1, callback);
                }
            });
        });
    }
    else if(component.retrieveData != null)
    {
        var retriever = component.retrieveData;
        var params = null;
        if(retriever.type == "regex")
        {
           params = retriever.regex;
        }        
        callback(retriever.type, params, retriever.setter);
    }
};