
export default function Profile({params}) {
  console.log(params.document);
    return (
      <main >
        <br /><br /><br />
        <h1>Bla bla bla</h1>
        <embed src= {`https://res.cloudinary.com/djtt5oivu/image/upload/${params.document}.pdf`} type="application/pdf"  width= "450px" height= "650px" title="New Pdf" style={{background:"white"}}/>

  
      </main>
    );
  }