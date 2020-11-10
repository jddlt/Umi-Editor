import Button from '@/Components/Antd/Button';
import Card from '@/Components/Antd/Card';
import Row from '@/Components/Antd/Row';
import Col from '@/Components/Antd/Col';
import Form from '@/Components/Antd/Form';
import FormItem from '@/Components/Antd/Form.Item';
import Input from '@/Components/Antd/Input';
import Switch from '@/Components/Antd/Switch';
import Text from '@/Components/Antd/Text';
import Table from '@/Components/Antd/Table';

export default {
  Text,
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  Table,
  'Form.Item': FormItem,
  Switch,
} as Record<string, Txp.IAntdComp<any>>;
