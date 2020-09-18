export default function ({ $auth, redirect }) {
  if ($auth.user.role !== 'Accession') {
    return redirect('/')
  }
}
