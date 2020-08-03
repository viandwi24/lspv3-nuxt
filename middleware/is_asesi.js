export default function ({ $auth, redirect }) {
  if ($auth.user.role !== 'Asesi') {
    return redirect('/')
  }
}
