import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

	const [pId, setPid] = useState('');
	const [sId, setSid] = useState('girlsfab');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [info, setInfo] = useState(false);
	const [duplicateInfo, setDuplicateInfo] = useState(false);


	function onSubmitFn(e){
		console.log('onSubmit................');
		e.preventDefault();

		const options = {
			method: 'POST'
		};

		if(pId != '' && sId != ''){
			setLoading(true);
			fetch(`https://tryagain-7om2.onrender.com/${sId}/${pId}`, options)
			.then( async function(data){
				var retData = await data.json();
				setLoading(false);
				if(retData.success == true){
					setPid('');
					if(retData.data){
						setInfo(true);
						setTimeout(function(){
							setInfo(false);
						}, 3000);
					}else{
						setDuplicateInfo(true);
						setTimeout(function(){
							setDuplicateInfo(false);
						}, 3000);
					}
				}else{ 
					setError(true);
					setTimeout(function(){
						setError(false);
					}, 3000);
				}
			})
			.catch(e => {
				setLoading(false);
			});
		}
	}

	function handlePidChange(e){
		setPid(e.target.value);
	}

	function handleSidChange(e){
		setSid(e.target.value);
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-md-4 mx-auto">
					<form id="formRef" onSubmit={onSubmitFn}>
						<div className="mb-3">
							<label htmlFor="exampleInputEmail1" className="form-label">P</label>
							<input type="text" className="form-control" id="pIdRef" value={pId} name="pRef" aria-describedby="emailHelp" onChange={handlePidChange}/> 
						</div>
						<div className="mb-3">
							<label htmlFor="selectInputRef" className="form-label">S</label>
							<select className="form-select" id="sIdRef" name="sRef" value={sId} onChange={handleSidChange} aria-label="Default select example">
								<option value="girlsfab">gf</option>
							</select>
						</div>
						{!loading && <button type="submit" className="btn btn-primary" id="submit1Ref">Submit</button>}
						{loading && <button className="btn btn-primary" type="button" id="submit2Ref">
							<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;
							Submitting...
						</button>}
						<br/>
						<br/>
						{info && <div>Product added successfully</div>}
						{duplicateInfo && <div>Product already exists</div>}
						{error && <div>Something went wrong. Try again</div>}
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
