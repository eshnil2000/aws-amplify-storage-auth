import React from 'react'
import { useState } from 'react'
import UserContext from './UserContext'
import Container from './Container'
import Amplify, { Storage } from 'aws-amplify'
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const App = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const downloadUrl = async () => {
    // Creates download url that expires in 5 minutes/ 300 seconds
    const downloadUrl = await Storage.vault.get('xx.jpg', { level: 'private' });
    const files = await Storage.vault.list('');
    files.forEach(async (file) =>{ 
	console.log(file.key)
        const downloadUrl = await Storage.vault.get(file.key, { level: 'private' });
        console.log(downloadUrl);
	});
    //console.log('files: ', files);
    //console.log(downloadUrl);
    //window.location.href = downloadUrl;
  }

  const handleChange = async (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    try {
      setLoading(true);
      // Upload the file to s3 with private access level. 
      await Storage.put(file.name, file, {
        level: 'private',
        contentType: 'image/jpg'
      });
      // Retrieve the uploaded file to display
      const url = await Storage.get(file.name, { level: 'private' })
      setImageUrl(url);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <h1> Upload an Image </h1>
      {loading ? <h3>Uploading...</h3> : <input
        type="file" accept='image/jpg'
        onChange={(evt) => handleChange(evt)}
      />}
      <div>
        {imageUrl ? <img style={{ width: "30rem" }} src={imageUrl} alt="no pic" /> : <span />}
      </div>
      <div>
        <h2>Download URL?</h2>
        <button onClick={() => downloadUrl()}>Click Here!</button>
      </div>
    </div>
  );
}


class Home extends React.Component {
  static contextType = UserContext;

  render() {
    const isAuthenticated = this.context.user && this.context.user.username ? true : false
    return (
      <Container>
        <h1>Welcome</h1>
        {
          isAuthenticated && (
            <>
		<App />				
            </>
          )
        }
      </Container>
    )
  }
}


export default Home
