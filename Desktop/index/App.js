//how to create nested div like:
{/* <div id="parent">
    <div id = "child">
        <h1></h1>
    </div>
</div> */}
// const parent = React.createElement("div", {id:"parent"},React.createElement("div", {id:"child"}), React.createElement("h1", {}, "I am h1 tag") )
// console.log(parent)
// const root1 = ReactDOM.createRoot(document.getElementById("root"));
// root1.render(parent);


//how to create 2 childrens?
{/* <div id="parent">
    <div id = "child">
        <h1></h1>
        <h1></h1>
    </div>
</div> */}
// const parent=React.createElement("div", {id:"parent"},   React.createElement("div", {id:"child"}, [React.createElement("h1", {}, "I am h1 tag") , React.createElement("h2" , {} , "I am h2 tag")]))
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(parent);




//how to create 2 childrens?
{/* <div id="parent">
    <div id = "child">
        <h1></h1>
        <h1></h1>
    </div>
    <div id = "child1">
        <h1></h1>
        <h1></h1>
    </div>
</div> */}
const parent = React.createElement("div" , {id:"parent"} , 
[React.createElement("div", {id:"child1"},[React.createElement("h1",{}, "I am parent H1 tag"), React.createElement("h1",{}, "I am parent H2 tag")]),
React.createElement("div", {id:"child2"},[React.createElement("h1",{}, "I am parent2 H1 tag"), React.createElement("h1",{}, "I am parent2 H2 tag")])

])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent)








//for heading only
// const heading = React.createElement("h1", {id:"heading"}, "Hello World"); //when we create root its job of react element.
// console.log(heading);// this h1 tag is an object
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

//react.createElement is an object
//root.render 's job is to take this object and create the h1 tag and put the inside of root. its converting the h1 object to tag and putting into the root.





//if i write like this at all times its too complicated. here comes jsx concept




//for header
const header=React.createElement("div", {id:"header"}, "I am header");
const heads = ReactDOM.createRoot(document.getElementById("header"));
heads.render(header);
