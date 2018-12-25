import React from 'react'
import ReactPlayer from 'react-player'

const Room = () => {
   return (<div className="Room">
    <div className="AreaInfo">
      <div className="Media">
        <ReactPlayer
          className="player"
          url={'https://www.youtube.com/watch?v=-VKIqrvVOpo'}
          playing
          loop={true}
          muted={true}
          volume={0.1}
          width={112}
          height={65}
        />
        <div className="info">
          <p>Lorem, ipsum dolor.</p>
          <p> 🎧 🔁 📢 0.1</p>
        </div>
      </div>
      <div className="Players">
        <a href="/">Logout</a>
        <p>4 players</p>
        {/* <ul>
          <li><figure><img src="/icon-100x100.png" alt=""/></figure></li>
          <li><figure><img src="/icon-100x100.png" alt=""/></figure></li>
          <li><figure><img src="/icon-100x100.png" alt=""/></figure></li>
          <li><figure><img src="/icon-100x100.png" alt=""/></figure></li>
        </ul> */}
      </div>
      <div className="DataSheets">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="DataSheet">
            <div className="row">
              <div className="col">
                <div className="name"><span>PL{('0'+(i+1)).slice(-2)}</span></div>
                <div className="bar"><span>HP: 10</span></div>
                <div className="bar"><span>MP: 20</span></div>
                <div className="bar"><span>SAN: 39</span></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="AreaScreen">
      <div className="Background"></div>
      {/* <div className="Fields">
        <div className="inner">
          {[...Array(40*20)].map((_, i) => <div key={i} style={{
            paddingTop: `${(100 / 40)}%`,
            width: `${(100 / 40)}%`
          }} className="cell">
            {i % 12 === 0 ? <figure><img src="/man.png" alt=""/></figure> : null}
          </div>)}
        </div>
      </div> */}
      {/* BG */}
      {/* Field */}
      {/* Obj */}
      {/* Marker */}
      <div className="Buttons">
        <a href="/"><span>🖋</span></a>
        <a href="/"><span>+</span></a>
      </div>
      {/* <div className="EditButtons">
        <a href="/"><span>🎥</span></a>
      </div> */}
      <div className="Panels">
        <figure><img src="/man.png" alt=""/></figure>
        <figure><img src="/man.png" alt=""/></figure>
      </div>
    </div>
    <div className="AreaChat">
      <div className="Messages">
        <div className="inner">
          <div className="Message">
            <h1>NAME</h1>
            <p>TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
          </div>
          <div className="Message">
            <h1>NAME</h1>
            <p>TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
            <p className="dice">3d6 => [3,1,2] => 6</p>
          </div>
          <div className="Message">
            <h1>NAME</h1>
            <figure><img src="/bg.jpg" alt=""/></figure>
            <p>TEXT TEXT TEXT</p>
          </div>
          <div className="Message" from="me">
            <h1>NAME</h1>
            <figure><img src="/icon-100x100.png" alt=""/></figure>
            <p>TEXT TEXT TEXT</p>
          </div>
          <div className="Message" from="me">
            <h1>NAME</h1>
            <p>TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
          </div>
          <div className="Message" from="sys">
            <h1>NAME</h1>
            <p>TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
          </div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="Message">
              <h1>NAME</h1>
              <p>TEXT TEXT TEXT TEXT TEXT TEXT TEXT TEXT</p>
            </div>
          ))}
        </div>
      </div>
      <div className="ChatTab">
        <nav>
          <a href="" active="true">main</a>
          <a href="">secret</a>
          <a href="">private</a>
          <a href="">sys</a>
          <a href="">memo</a>
        </nav>
      </div>
      <div className="ChatBox">
        <form>
          <input type="text" name="name" defaultValue="KP" />
          <textarea name="text" />
          <button>send</button>
        </form>
        <nav>
          <a href="">+</a>
        </nav>
      </div>
    </div>
  </div>)
}

export default Room