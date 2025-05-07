import java.util.*;
public class RockPaperScissor {
	public static void main(String[] args) {
		Scanner input = new Scanner(System.in);

		while (true) {
			String [] Moves = {"Rock","Paper","Scissor"};
			String computerMove = Moves[new Random().nextInt(Moves.length)];
			System.out.println("Computer Move!");
			System.out.println();
			System.out.println("Now it's your turn choose the best");
			System.out.println();
			String userMove;
		}
	}
}




































		
			String userMove;
			while(true) {
				System.out.println("Please choose your move from these available moves : 'Rock' 'Paper' 'Scissors' ");
				System.out.println("Enter the move you chose : ");
				userMove = input.nextLine();
				if(userMove.equals("Rock") || userMove.equals("Paper") || userMove.equals("Scissors")){
					System.out.println();
					break;
				}
				System.out.println();
				System.out.println("Invalid Move!!");
				System.out.println("Please enter the move from the available moves only!");
				System.out.println();
			}
			System.out.println("Computer chose : " + computerMove);
			if(userMove.equals(computerMove)) {
				System.out.println("Its a tie!");
			}
			else if(userMove.equals("Rock")) {
			
				if(computerMove.equals("Paper")) {
					System.out.println("Computer won!");
					System.out.println("Better luck next time!");
				} 
				else if(computerMove.equals("Scissors")) {
					System.out.println("You won!");
					System.out.println("Congratulations!");
				}
			}
			else if(userMove.equals("Paper")) {
			
				if(computerMove.equals("Rock")) {
					System.out.println("You won!");
					System.out.println("Congratulations!");
				} 
				else if(computerMove.equals("Scissors")) {
					System.out.println("Computer won!");
					System.out.println("Better luck next time!");
				}
			}
			else if(userMove.equals("Scissors")) {
			
				if(computerMove.equals("Paper")) {
					System.out.println("You won!");
					System.out.println("Congratulations!");
				} 
				else if(computerMove.equals("Rock")) {
					System.out.println("Computer won!");
					System.out.println("Better luck next time!");
				}
			}
			System.out.println();
			String playAgain;
			System.out.println("Do you want to play again? ");
			while(true) {
				System.out.println("Type 'yes' or 'no' ");
				playAgain = input.nextLine();
				
				if(playAgain.equals("yes") || playAgain.equals("Yes") || playAgain.equals("no") || playAgain.equals("No")) {
					System.out.println();
					System.out.println("*****************************************************************************");
					System.out.println();
					break;
				}
				System.out.println();
				System.out.println("Invalid Input");
				System.out.println();
			}
			
			if(playAgain.equals("no") || playAgain.equals("No")) {
				break;
			}
		}
	}
}
    