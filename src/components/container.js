import React, {Component} from 'react';
import Spinner from 'react-spinkit';

const log = console.log;

class Container extends Component {
	constructor() {
		super();
		this.state = {
			data: '',
			posts: '',
			comments: '',
		}
		this.loadMoreComments = this.loadMoreComments.bind(this);
	}

	loadMoreComments(e){
		let hideComments = document.querySelectorAll('.hide-' + e.target.id);
		if(hideComments){
			hideComments.forEach(el=> el.classList.remove('hide-comment'))
		}else{
			return
		}
	}

	postRender(){
		const {posts, comments} = this.state;
		let listItem = new Array();
		for(let i=1; i<10; i++){
			listItem.push(<div className="well" key={i}>
	                  <div className="media-body">
	                    <h4 className="media-heading">{posts[i].title}</h4>
	                      <p className="text-right">By user: {posts[i].userId}</p>
	                      <p>{posts[i].body}</p>
	                      <div className="row">
	                       <div className="col-md-8">
	                        <h2 className="page-header" id="2">Comments</h2>
                      		{comments?comments.filter(el=> el.postId === i)
	                      		.map((el,j)=>
	                      			j<=2?<section className="comment-list" key={j}>
		                                  <div className="row" key={j}>
		                                    <div className="col-md-10 col-sm-10">
		                                      <div className="panel panel-default arrow left">
		                                        <div className="panel-body">
		                                          <header className="text-left">
		                                            <div className="comment-user"><i className="fa fa-user"></i>{el.name}</div>
		                                          </header>
		                                          <div className="comment-post">
		                                            <p>
		                                            {el.body}
		                                            </p>
		                                          </div>
		                                        </div>
		                                      </div>
		                                    </div>
		                                  </div>
	                                	</section>
	                                	:
	                                	<section className={`comment-list hide-comment hide-${i}`} key={j} >
		                                  <div className="row" key={j}>
		                                    <div className="col-md-10 col-sm-10">
		                                      <div className="panel panel-default arrow left">
		                                        <div className="panel-body">
		                                          <header className="text-left">
		                                            <div className="comment-user"><i className="fa fa-user"></i>{el.name}</div>
		                                          </header>
		                                          <div className="comment-post">
		                                            <p>
		                                            {el.body}
		                                            </p>
		                                          </div>
		                                        </div>
		                                      </div>
		                                    </div>
		                                  </div>
	                                	</section>
		                      	)
	                      		: <Spinner name="circle" />}
	                      	  </div>
	                      	</div>
	                      <ul className="list-inline list-unstyled">
	                        <span onClick={this.loadMoreComments} id={i} className="load-comments"><i className="glyphicon glyphicon-comment"></i> Load more ...</span>
	                      </ul>
	                  </div>
	                </div>)
		}
		return listItem;
	}

	async componentDidMount(){
		await fetch('https://jsonplaceholder.typicode.com/posts').then(res=>res.json()).then(data=> this.setState({posts: data}));
		await fetch('https://jsonplaceholder.typicode.com/comments').then(res=>res.json()).then(data=> this.setState({comments: data}))
		const outPut = this.postRender();
		this.setState({data: outPut});
	}

	render(){
		const {posts, comments} = this.state;
		
		return(
				<div className="container">
					{!posts ?
						<div className='spinner'>
					  		<Spinner name="ball-pulse-rise" color="steelblue" />
					  	</div>
					    : this.state.data
					}
					
				</div>
			)
	}
};

export default Container;