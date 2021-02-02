export default function ({ $auth, redirect }) {
  if ($auth.user.role !== 'Admin') {
    console.log($auth)
    return redirect('/')
  }
}
