module.exports = {

    index: (req,res)=> {
        res.render('index');
    },
    
    login: (req,res)=> {
        name = req.body.name;
        res.redirect('/chat');
    },
    
    chat: (req,res)=>{
        console.log('New User:', name);
        res.render('chat', {name:name});
    },

}