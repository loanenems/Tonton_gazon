<div>
    <h1>Bonjour {{$user->surname}} !</h1>
    @if($type === 0)
        <p>Quelqu'un souhaite vous rendre un service ! Veuillez consulter votre profil pour répondre à cette
            demande.</p>
    @else
        <p>Quelqu'un souhaite bénéficier de vos services ! Veuillez consulter votre profil pour répondre à cette
            demande.</p>
    @endif
</div>
