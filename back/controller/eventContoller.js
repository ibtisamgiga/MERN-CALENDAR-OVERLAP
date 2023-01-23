
const Event = require('../model/Events');


const create_Event_post = async (req, res) => {
    console.log(req.body)
try{
    const event = new Event(req.body)
    const result = await event.save()
    console.log(result)
}
catch(err){
    res.send(err)
}
}

const get_all_events = async (req, res) => {
    
     try {
        const ownerEmail=req.params.user;        
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
                stime: req.body.stime,
                etime: req.body.etime,
                
            }
        }, { new: true });
      //res.redirect('/blogs/blogsall')
      res.json({success : true}) 
    } catch (e) {
        console.log(e)
    }

   // res.redirect('/blogs/blogsall')
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

module.exports={
    create_Event_post,
    get_all_events,
    del_events,
    event_update_post,
    get_event
}