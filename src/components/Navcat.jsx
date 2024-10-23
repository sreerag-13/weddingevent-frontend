import React from 'react'

const Navcat = () => {
  return (
    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
<div class="container-fluid">
<a class="navbar-brand" href="#">Navbar</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  <div class="navbar-nav">
    <a class="nav-link active" aria-current="page" href="#">Home</a>
    <a class="nav-link" href="/Cviewpost">MyPost</a>
    <a class="nav-link" href="/Createc">Create post</a>
    <a class="nav-link" href="/Cpricing">add pricing</a>
    <a class="nav-link" href="">Booking</a>
    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
  </div>
  <button class="btn btn-outline-danger ms-auto" type="button">Logout</button>
</div>
</div>
</nav>

</div>
  )
}

export default Navcat