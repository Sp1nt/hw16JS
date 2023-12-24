$(document).ready(function () {
    const $cards = $('.content-card');
    let hasRotate = false;
    let lock = false;
    let firstCard; 
    let secondCard;

    function resetBoard() {
        hasRotate = false;
        lock = false;
        firstCard = null;
        secondCard = null;
    }

    function moveCards() {
        $cards.each(function () {
            let random = Math.floor(Math.random() * $cards.length);
            $(this).css('order', random);
        });
    }

    function startGame() {
        moveCards();
        $cards.removeClass('rotate opacityCheck').off('click', rotateCards);
        $('.block-end').css('transform', 'scale(0)');
        $('.nav__btn').html('Finish').off('click').on('click', finishGame);

        setTimeout(function () {
            $cards.addClass('rotate');
            lock = true;

            setTimeout(function () {
                $cards.removeClass('rotate');
                lock = false;
                $cards.on('click', rotateCards);
            }, 2000);
        });
    }

    function endGame(rez) {
        $(rez).css('transform', 'scale(1)');
        $('.nav__btn').html('Start');
        $('.btn').off('click').on('click', function () {
            $('.block-end').css('transform', 'scale(0)');
            $cards.removeClass('rotate opacityCheck');
            resetBoard();
            $cards.off('click');
            $('.nav__btn').off('click').on('click', startGame);
        });
    }

    function opacityCards() {
        setTimeout(function () {
            firstCard.addClass('opacityCheck');
            secondCard.addClass('opacityCheck');

            if ($('.content-card:not(.opacityCheck)').length == 0) {
                endGame('.win');
            }

            resetBoard();
        }, 1000);
    }

    function rotateCards() {
        if ($(this).hasClass('rotate') || $(this).hasClass('opacityCheck') || $('.rotate:not(.opacityCheck)').length >= 2) {
            return false;
        }

        $(this).addClass('rotate');

        if (!hasRotate) {
            hasRotate = true;
            firstCard = $(this);
        } else {
            secondCard = $(this);
            checkForMatch();
        }
    }

    function unrotateCards() {
        lock = true;

        setTimeout(function () {
            firstCard.removeClass('rotate');
            secondCard.removeClass('rotate');

            resetBoard();
        }, 1000);
    }

    function checkForMatch() {
        let isCheck = firstCard.find('.front-card').attr('alt') == secondCard.find('.front-card').attr('alt');

        if (isCheck) {
            opacityCards();
        } else {
            unrotateCards();
        }
    }

    function finishGame() {
        $cards.removeClass('flip opacityCheck');
        resetBoard();
        endGame('.lose');
    }

    $('.nav__btn').on('click', startGame);
});
