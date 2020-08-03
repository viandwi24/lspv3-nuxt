export default function ({ $auth, redirect }) {
  if ($auth.user.role !== 'Admin') {
    return redirect('/')
  }
}
