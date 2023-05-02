<?php
	function CheckUser()
	{
		$action = $_POST['Action'] ?? null;

		if ($action == 'Login')
		{
			Login();
		}
		elseif ($action == 'Logout')
		{
			Logout();
		}

		ShowUser();
	}

	function Login()
	{
		global $server;

		$login = $_POST['User'];

		if ($login != null)
		{
			$sql = 'SELECT * FROM User WHERE Name="' . $login . '"';

			$result = mysqli_query($server, $sql);
			$feedback = mysqli_fetch_all($result, MYSQLI_ASSOC);

			if ($feedback != null)
			{
				foreach($feedback as $user)
				{
					if($user['Name'] == $login)
					{
						$_SESSION['User'] = $login;
					}
				}
			}
		}
	}

	function Logout()
	{
		$_SESSION['User'] = null;
	}

	function ShowUser()
	{
		if (isset($_SESSION['User']))
		{
			echo($_SESSION['User']);
			?>
				<form method="post">
					<input type="hidden" name="Action" value="Logout">
					<input type="submit" value="Logout">
				</form>
			<?php
		}
		else
		{
			?>
				<form method="post">
				<input type="hidden" name="Action" value="Login">
					<input type="text" name="User">
					<input type="submit" value="Login">
				</form>
			<?php
		}
	}
?>