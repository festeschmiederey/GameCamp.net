<?php
	function ShowMaps()
	{
		global $server;

		$sql = 'SELECT * FROM Maps';

		$result = mysqli_query($server, $sql);
		$feedback = mysqli_fetch_all($result, MYSQLI_ASSOC);

		if ($feedback != null)
		{
			foreach($feedback as $map)
			{
				echo('<p>' . $map['Name'] . '</p>');

				?>
					<form method="post">
						<input type="hidden" name="Action" value="SaveMap">
						<input type="hidden" name="Name" value="<?php echo($map['Name']); ?>">
						<textarea name="Data" rows="16" cols="13" maxlength="256"><?php echo($map['Data']); ?></textarea>
						<input type="submit" value="Save Map">
					</form>
					<form method="post">
						<input type="hidden" name="Action" value="PlayMap">
						<input type="hidden" name="Name" value="<?php echo($map['Name']); ?>">
						<input type="submit" value="Play Map">
					</form>
				<?php
			}
		}

		?>
			<form method="post">
				<input type="hidden" name="Action" value="AddMap">
				<input type="text" name="Name">
				<input type="submit" value="Add Map">
			</form>
		<?php

		$action = $_POST['Action'] ?? null;

		if ($action == 'AddMap')
		{
			AddMap();
		}
		else if ($action == 'SaveMap')
		{
			SaveMap();
		}
	}

	function AddMap()
	{
		global $server;

		$map = $_POST['Name'] ?? null;

		if ($map != null)
		{
			$sql = 'INSERT INTO Maps (Name) VALUES ("' . $map . '")';

			$result = mysqli_query($server, $sql);
		}
	}

	function SaveMap()
	{
		global $server;

		$map = $_POST['Name'] ?? null;

		if ($map != null)
		{
			$sql = 'UPDATE Maps SET Data = "' . $_POST['Data'] . '" WHERE Name = "' . $_POST['Name'] . '"';

			$result = mysqli_query($server, $sql);
		}
	}
?>