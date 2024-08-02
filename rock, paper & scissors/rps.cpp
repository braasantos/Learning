#include <string>
#include <iostream>
#include <random>

int computer()
{
	std::random_device rd;
    std::mt19937 rng(rd());
    std::uniform_int_distribution<int> dist(0, 2);
    int random_number = dist(rng);
	return (random_number);
}

int number_ret(std::string answer)
{
	std::string rps[] = {"rock", "paper", "scissors"};
	for (int i = 0; i < rps->length(); i++)
	{
		if (answer == rps[i])
			return (i);
	}
	return (-1);
}

int main(void)
{
	std::string my_answer;
	std::cout << "ROCK, PAPER OR SCISSORS ?" << std::endl;	
	std::cin >> my_answer;
	int computer_answer;
	std::string answer;
	for (int i = 0; i < my_answer.length(); i++)
		answer += tolower(my_answer[i]);
	int number = number_ret(answer);
	 if (number == -1)
	{
		std::cout << "Invalid input!" << std::endl;
		return 1;
	}
	computer_answer = computer();
	std::string rps[] = {"rock", "paper", "scissors"};
	std::cout << "You entered: " << rps[number] << std::endl;
	std::cout << "Computer entered: " << rps[computer_answer] << std::endl;
	if (number == computer_answer)
		std::cout << "TIE\n";
	else if ((number + 1) % 3 == computer_answer)
		std::cout << "COMPUTER WON" << std::endl;
	else
		std::cout << "YOU WON" << std::endl;
}