<?php
/**
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component %>
 *
 * @copyright   Copyright (C) 2005 - 2014 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

/**
 * Weblinks helper.
 *
 * @package     Joomla.Administrator
 * @subpackage  com_<%= component %>
 * @since       1.6
 */
class <%= camelcase %>Helper extends JHelperContent
{
	/**
	 * Configure the Linkbar.
	 *
	 * @param   string  $vName  The name of the active view.
	 *
	 * @return  void
	 *
	 * @since   1.6
	 */
	public static function addSubmenu($vName = '<%= views.standard.listview.lowercase %>')
	{
		JHtmlSidebar::addEntry(
			JText::_('COM_<%= uppercase %>__SUBMENU_<%= views.standard.listview.uppercase %>'),
			'index.php?option=com_<%= component %>&view=<%= views.standard.listview.lowercase %>',
			$vName == '<%= views.standard.listview.lowercase %>'
		);
		<% if (db.fields.categories) { %>
		JHtmlSidebar::addEntry(
			JText::_('COM_<%= uppercase %>__SUBMENU_CATEGORIES'),
			'index.php?option=com_categories&extension=com_<%= component %>',
			$vName == 'categories'
		);<% } %>
	}
}
