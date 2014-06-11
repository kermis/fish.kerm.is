// var playingWithLeap = false;
// var playingWithPhone = false;
// var playingWithKeys = false;

$(function(){
	$('.choose_button').on('click', function(){
		var id = $(this).attr('id');
		$('.info .title').html('How do you play?')
		$('.back-button').show();
		switch(id){
			case 'socket' :
				playingWithPhone = true;
				$('.buttons').hide();
				$('.chose_socket').show();
				// socketController.updateInstructions();
				break;
			case 'leap':
				playingWithLeap = true;
				$('.buttons').hide();
				$('.chose_leap').show();
				break;
			case 'computer':
				playingWithKeys = true;
				$('.buttons').hide();
				$('.chose_computer').show();
				break;
		}
	})

	$('.back-button').on('click', function(){
		$('.info .title').html('Which controller do you want to use?')
		$('.chose_socket').hide();
		$('.chose_leap').hide();
		$('.chose_computer').hide();

		$('.buttons').show();
		$('.back-button').hide()
	});

	$('.play').on('click', function(){
		game.start();
	})

	$(document).on('click', '.next-level-button', function(){
		game.nextLevel();
	})

	$('.score-submit').on('click', function(){

		$('.score-submit').hide();
		$('.game-over').append('<span class="score-message">Sharing Score</span>');

		$('.score-final').html(score);

		$.post( "http://kermisdatabasevanbartenrobbert.herokuapp.com/addhighscore/fish",
			{ 	name: name,
				score: score,
			} )
		.done(function(){
			$('.score-submit').hide();
			$('.score-message').html('score succesully shared.')

		}).fail(function(){
			$('.score-message').html('something went wrong, please try again').delay(4000).fadeOut();
			$('.score-submit').show();
		});
	})
})

function showNotification(text){
	$('.notification').html(text);

	$('.notification').addClass('active');
	setTimeout(function(){
		$('.notification').removeClass('active');
	}, 1500)
}