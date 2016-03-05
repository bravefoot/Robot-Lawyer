var convoController = function(index, callback)
{
    var component = conversation[index];
    if(component.text != null)
    {
    }
    else if(component.keywords != null)
    {
    }
    else if(component.retrieveData != null)
    {
        var retriever = component.retrieveData;
        if(retriever.type === "regex")
        {
        }
        else if(retriever.type === "text/plain")
        {
        }
        else if(retriever.type === "file")
        {
        }
        else if(retriever.type === "date")
        {
        }
        callback(retriever.type, retriever.setter);
    }
};