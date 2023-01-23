const Event = require('../model/Allevent');


const create_All_post = async (req, res) => {
    try{

    const event = new Event(req.body)
    const result = await event.save()
    console.log(result)
    // res.redirect('/events/calendar')}
    }
    catch(err){
        console.log(err)
    }

}



const get_all_events = async (req, res) => {
   const ownerEmail=req.params.user;
    

    try {        
        const events = await Event.find({ownerEmail}).sort({ createdAt: -1 });
       //res.render('index', { myevents:events ,makeEvent:helper.makeEvent});
      res.status(201).json(events)
     }
    catch (err) {
         res.send(err)
     }

 }



 const del_events =async(req,res)=>{
    try{

     const event= await Event.findByIdAndDelete( req.params.id)
     if (!event) return res.status(404).send("ERROR 404");
     res.status(200).send("deleted");
  // res.redirect('/events/calendar')
}
   catch(err){
    console.log(err)
}

 }


 const get_event = async (req, res) => {
    const id=req.params.id;
     
 
     try {        
         const events = await Event.find({_id:id}).sort({ createdAt: -1 });
        //res.render('index', { myevents:events ,makeEvent:helper.makeEvent});
       res.status(201).json(events)
      }
     catch (err) {
          res.send(err)
      }
 
  }
 


  const event_update_post = async (req, res) => {

    // const blog = new Blog(req.body)
    // const result = await blog.save()
    // console.log(result)
    
    try {
        console.log('Request fired')
        const event = await Event.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                location: req.body.location,
                
            }
        }, { new: true });
      //res.redirect('/blogs/blogsall')
      res.json({success : true}) 
    } catch (e) {
        console.log(e)
    }

   // res.redirect('/blogs/blogsall')
}


module.exports={
    create_All_post,
    get_all_events,
    del_events,
    get_event ,
    event_update_post
}


// router.get("/del/:id",ec.del_events)